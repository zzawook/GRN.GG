import { getPlayerHistory, getMatchData, getOutdatedPlayers } from '../components/calls.js'
import { handleMatchData } from '../components/data.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fetch = require("node-fetch")
const mysql = require('mysql')

//setInterval(1000 * 60 * 60 * 0.5);

const GAMEMODE = "http://static.developer.riotgames.com/docs/lol/gameModes.json"
const MAPS = "http://static.developer.riotgames.com/docs/lol/maps.json"
const SEASONS = "http://static.developer.riotgames.com/docs/lol/seasons.json"
const VERSIONS = "https://ddragon.leagueoflegends.com/api/versions.json"
const QUEUES = "http://static.developer.riotgames.com/docs/lol/queues.json"
const GAMETYPE = "http://static.developer.riotgames.com/docs/lol/gameTypes.json"
const CHAMPIONS = "http://ddragon.leagueoflegends.com/cdn/11.10.1/data/en_US/champion.json"
const CHAMPION_SPECIFIC = "http://ddragon.leagueoflegends.com/cdn/11.10.1/data/en_US/champion/"
const ITEMS = "http://ddragon.leagueoflegends.com/cdn/11.10.1/data/en_US/item.json"
const SPELLS = "http://ddragon.leagueoflegends.com/cdn/11.10.1/data/en_US/summoner.json"
const SPELL_SPECIFIC = "http://ddragon.leagueoflegends.com/cdn/11.10.1/img/spell/"

let version = "";
let CHAMPIONS_DATA = []
let CHAMPIONS_IDLIST = []
let CHAMPIONS_LIST = []
const positions = ['TOP', 'JGL', 'MID', 'ADC', 'SPT']

function setUp() {
    return new Promise((resolve, reject) => {
        fetch(VERSIONS).then(response => {
            if (response.status != 200)
            {
                reject(false)
            }
            response.json().then(data => {
                version = data[0];
                fetch(CHAMPIONS).then(response1 => {
                    if (response1.status != 200)
                    {
                        reject(false)
                    }
                    response1.json().then(data1 => {
                        CHAMPIONS_DATA = data1['data'];
                        resolve(true)
                    })
                })
            })
        })
    })
}

function championDataProcess() {
    CHAMPIONS_LIST = Object.keys(CHAMPIONS_DATA);
    for (let i = 0; i < CHAMPIONS_LIST.length; i++) {
        CHAMPIONS_IDLIST.push(CHAMPIONS_DATA[CHAMPIONS_LIST[i]]['key'])
    }
}

async function calculateChampionStatistics(regionId) {
    await setUp()
    await championDataProcess()

    let CHAMPION_WINRATES = {}
    let CHAMPION_WINCOUNTS = {}
    let CHAMPION_BANRATES = {}
    let CHAMPION_BANCOUNTS = {}
    let CHAMPION_PICKCOUNTS = {}
    let CHAMPION_PICKRATES = {}

    let matchCount = 0;

    const con = mysql.createConnection({
        host: '165.22.223.89',
        user: 'kjaehyeok21',
        password: 'airbusa380861',
        database: 'LOLGRN',
        port: '/var/run/mysqld/mysqld.sock'
    })
    //for each champion
    for (let i = 0; i < CHAMPIONS_LIST.length; i++)
    {
        CHAMPION_PICKRATES[CHAMPIONS_IDLIST[i]] = [0,0,0,0,0]
        CHAMPION_WINRATES[CHAMPIONS_IDLIST[i]] = [0,0,0,0,0]
        
        let banSQL = `SELECT COUNT (gameId) as count from matchDB where regionId = "${regionId}" AND (ban1 = ${CHAMPIONS_IDLIST[i]} OR ban2 = ${CHAMPIONS_IDLIST[i]} OR ban3 = ${CHAMPIONS_IDLIST[i]} OR ban4 = ${CHAMPIONS_IDLIST[i]} OR ban5 = ${CHAMPIONS_IDLIST[i]} OR ban6 = ${CHAMPIONS_IDLIST[i]} OR ban7 = ${CHAMPIONS_IDLIST[i]} OR ban8 = ${CHAMPIONS_IDLIST[i]} OR ban9 = ${CHAMPIONS_IDLIST[i]} OR ban10 = ${CHAMPIONS_IDLIST[i]})` //SQL for counting bans for this champion for this patch version
        //count bans for this champion
        con.query(banSQL, (err, result) => {
            if (err) {
                console.log(err)
                con.end()
                return;
            }
            let ang = JSON.parse(JSON.stringify(result))
            CHAMPION_BANCOUNTS[CHAMPIONS_IDLIST[i]] = ang[0]['count'];
        })
        
        for (let a = 0; a < positions.length; a++) {
    
            let winSQL = `SELECT COUNT (gameId) as count from matchRecordDB WHERE regionId = "${regionId}" AND matchRecordDB.champId = ${CHAMPIONS_IDLIST[i]} AND matchRecordDB.role = "${positions[a]}" AND matchRecordDB.win = 1`//SQL for counting wins with this champion for this patch version
            let pickSQL = `SELECT COUNT (gameId) as count from matchRecordDB WHERE regionId = "${regionId}" AND matchRecordDB.role = "${positions[a]}" AND matchRecordDB.champId = ${CHAMPIONS_IDLIST[i]}` //SQL for calculating pick rates for this champion for this patch version
    
            //count wins with this champion for this role
            con.query(winSQL, (err, result) => {
                if (err) {
                    console.log(err)
                    con.end()
                    return;
                }
                let ang = JSON.parse(JSON.stringify(result))
                let prevProfile = CHAMPION_WINCOUNTS[CHAMPIONS_IDLIST[i]]
                if (prevProfile == null) {
                    prevProfile = [ang[0]['count']]
                }
                else {
                    prevProfile.push(ang[0]['count'])
                }
                CHAMPION_WINCOUNTS[CHAMPIONS_IDLIST[i]] = prevProfile;
            })

            //count number of appearance of this champion for this role
            con.query(pickSQL, (err, result) => {
                if (err) {
                    console.log(err)
                    con.end()
                    return;
                }
                let ang = JSON.parse(JSON.stringify(result))
                let prevProfile = CHAMPION_PICKCOUNTS[CHAMPIONS_IDLIST[i]]
                if (prevProfile == null) {
                    prevProfile = [ang[0]['count']]
                }
                else {
                    prevProfile.push(ang[0]['count'])
                }
                CHAMPION_PICKCOUNTS[CHAMPIONS_IDLIST[i]] = prevProfile;
            })
        }
    }
    
    //count number of games surveyed
    let totSQL = `SELECT COUNT (gameId) as count from matchDB where regionId = "${regionId}"`
    con.query(totSQL, (err, result) => {
        if (err) {
            console.log(err)
            con.end()
            return;
        }
        let ang = JSON.parse(JSON.stringify(result))
        matchCount = ang[0]['count']
        console.log('MATCH COUNT: ' + matchCount.toString())

        for (let j = 0; j < CHAMPIONS_IDLIST.length; j++) {
            if (matchCount == 0) {
                CHAMPION_BANRATES[CHAMPIONS_IDLIST[j]] = 0
            }
            else {
                CHAMPION_BANRATES[CHAMPIONS_IDLIST[j]] = CHAMPION_BANCOUNTS[CHAMPIONS_IDLIST[j]] * 100 / matchCount
            }
            for (let k = 0; k < positions.length; k++) {
                if (matchCount == 0) {
                    CHAMPION_PICKRATES[CHAMPIONS_IDLIST[j]][k] = 0
                    CHAMPION_WINRATES[CHAMPIONS_IDLIST[j]][k] = 0
                }
                else {
                    CHAMPION_PICKRATES[CHAMPIONS_IDLIST[j]][k] = CHAMPION_PICKCOUNTS[CHAMPIONS_IDLIST[j]][k] * 100 / matchCount
                    if (CHAMPION_PICKCOUNTS[CHAMPIONS_IDLIST[j]][k] == 0) {
                        CHAMPION_WINRATES[CHAMPIONS_IDLIST[j]][k] = 0
                    }
                    else {
                        CHAMPION_WINRATES[CHAMPIONS_IDLIST[j]][k] = CHAMPION_WINCOUNTS[CHAMPIONS_IDLIST[j]][k] * 100 / CHAMPION_PICKCOUNTS[CHAMPIONS_IDLIST[j]][k]
                    }
                }
            }
        }

        const GSCORES = calculateOPScore(CHAMPIONS_IDLIST, CHAMPION_WINRATES, CHAMPION_PICKRATES, CHAMPION_BANRATES)
        for (let i = 0; i < CHAMPIONS_IDLIST.length; i++) {
            for (let j = 0; j < positions.length; j++) {
                let statInsertSQL = `UPDATE statDB SET winRate = ${CHAMPION_WINRATES[CHAMPIONS_IDLIST[i]][j].toString()}, winCount = ${CHAMPION_WINCOUNTS[CHAMPIONS_IDLIST[i]][j].toString()}, banRate = ${CHAMPION_BANRATES[CHAMPIONS_IDLIST[i]].toString()}, banCount = ${CHAMPION_BANCOUNTS[CHAMPIONS_IDLIST[i]].toString()}, pickRate = ${CHAMPION_PICKRATES[CHAMPIONS_IDLIST[i]][j].toString()}, pickCount = ${CHAMPION_PICKCOUNTS[CHAMPIONS_IDLIST[i]][j].toString()}, gScore = ${GSCORES[CHAMPIONS_IDLIST[i]][j].toString()} WHERE champId = ${CHAMPIONS_IDLIST[i].toString()} AND region = "${regionId.toString()}" AND position = "${positions[j]}"`
                con.query(statInsertSQL, (err, result) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    con.end()
                })
            }
        }     
    })
}

function calculateOPScore(champId, winrates, pickrates, banrates) {
    //for each champion
    let OPScore = {}
    for (let i = 0; i < champId.length; i++) {
        let newArray = [];
        for (let j = 0; j < 5; j++) {
            let temp = winrates[champId[i]][j] * (((-1)/Math.pow((0.09 * pickrates[champId[i]][j]) + 2.087, 2)) + 1.18) * (((-1)/Math.pow((0.2 * banrates[champId[i]]) + 4, 2)) + 1.0517)
            newArray.push(temp)
        }
        OPScore[champId[i]] = newArray;
    }
    return OPScore;
}

async function initialize() {
    await setUp()
    await championDataProcess()
    const con = mysql.createConnection({
        host: '165.22.223.89',
        user: 'kjaehyeok21',
        password: 'airbusa380861',
        database: 'LOLGRN',
        port: '/var/run/mysqld/mysqld.sock'
    })
    //for each champion
    const locale = ["SG", "TH", "VN", "PH", "TW"]
    const positions = ['TOP', 'JGL', 'MID', 'ADC', 'SPT']
    for (let i = 0; i < locale.length; i++) {
        for (let j = 0; j < CHAMPIONS_IDLIST.length; j++) {
            for (let k = 0; k < positions.length; k++) {
                let query = `INSERT INTO statDB (region, champId, champName, position) VALUES ("${locale[i]}", ${CHAMPIONS_IDLIST[j]}, "${CHAMPIONS_LIST[j]}", "${positions[k]}")`
                con.query(query, (err, result) => {
                    if (err) {
                        console.log(err)
                        con.end()
                        return;
                    }
                    else {
                        console.log("Success: " + locale[i].toString() + " " + CHAMPIONS_IDLIST[j].toString() + " " + CHAMPIONS_LIST[j] + " " + positions[k])
                    }
                })
            }
        }
    }
}

//initialize()
/*const interval = setInterval(async() => {
        const nowDate = new Date();
        const year = nowDate.getUTCFullYear()
        const month = nowDate.getUTCMonth()
        const date = nowDate.getUTCDate()
        const time = nowDate.getUTCHours()
        const minute = nowDate.getUTCMinutes()
        console.log("Data extracting at: " + year.toString() + " " + month.toString() + " " + date.toString() + ", " + time.toString() + ":" + minute.toString())
        calculateChampionStatistics("SG");
        calculateChampionStatistics("VN");
        calculateChampionStatistics("TH");
        calculateChampionStatistics("TW");
        calculateChampionStatistics("PH");
    }, 1000 * 60 * 60 * 1)*/

calculateChampionStatistics("SG");
calculateChampionStatistics("VN");
calculateChampionStatistics("TH");
calculateChampionStatistics("TW");
calculateChampionStatistics("PH");