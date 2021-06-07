import { getPlayerHistory, getMatchData, getOutdatedPlayers } from '../components/calls.js'
import { handleMatchData } from '../components/data.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fetch = require("node-fetch")


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
    for (let i = 0; i < CHAMPIONS_LIST.length; i++) {
        console.log(CHAMPIONS_IDLIST[i])
    }
}

async function calculateChampionStatistics() {
    version = await setUp()
    championDataProcess()
    if (!version) return;
    let CHAMPIONS_LIST = await getChampionsList()
    if (CHAMPIONS_LIST == 'failed')  return;

    CHAMPION_WINS = []
    CHAMPION_BANS = []
    CHAMPION_PICKRATES = []
    CHAMPION_NUMBEROFAPPEARANCE = []
    const con = mysql.createConnection({
        host: '165.22.223.89',
        user: 'kjaehyeok21',
        password: 'airbusa380861',
        database: 'LOLGRN'
    })
    //for each champion
    for (let i = 0; i < CHAMPIONS_LIST.length; i++)
    {
        
        let winSQL = 'SELECT COUNT (matchId) from matchDB where gameCreation > '+ lastPatchDate.toString() //SQL for counting wins with this champion for this patch version
        let banSQL = 'SELECT COUNT (matchId) from matchDB where gameCreation > ' + lastPatchDate.toString() //SQL for counting bans for this champion for this patch version
        let pickSQL = 'SELECT COUNT (matchId) from matchDB where gameCreation > ' + lastPatchDate.toString() //SQL for calculating pick rates for this champion for this patch version
        
        //count wins with this champion
        con.query(winSQL, (err, result) => {
            if (err) {
                console.log(err)
                con.end()
                return;
            }
            CHAMPION_WINS.push(result[0]);
        })
        
        //count bans for this champion
        con.query(banSQL, (err, result) => {
            if (err) {
                console.log(err)
                con.end()
                return;
            }
            CHAMPION_BANS.push(result[0])
        })

        //count number of appearance of this champion
        con.query(pickSQL, (err, result) => {
            if (err) {
                console.log(err)
                con.end()
                return;
            }
            CHAMPION_NUMBEROFAPPEARANCE.push(result[0])
        })
    }
    
    //count number of games surveyed
    const matchCount = 0;
    const matchSQL = 'SELECT COUNT(matchId) from matchDB where gameCreation > ' + lastPatchDate.toString() // SQL for counting total matches counted
    con.query(matchSQL, (err, result) => {
        if (err) {
            console.log(err)
            con.end()
            return;
        }
        matchCount = result[0]
    })

    //calculate pick rate for champions
    CHAMPION_PICKRATES = CHAMPION_NUMBEROFAPPEARANCE.map(i => i/result[0])

    //Insert the data into database
    winInsertSQL = 'INSERT '
    pickInsertSQL = 'INSERT '
    banInsertSQL = 'INSERT '
    NumAppearanceINSERTSQL = 'INSERT '

    con.query(winInsertSQL, (err, result) => {
        if (err) {
            console.log(err)
            con.end()
            return;
        }
    })
    con.query(pickInsertSQL, (err, result) => {
        if (err) {
            console.log(err)
            con.end()
            return;
        }
    })
    con.query(banInsertSQL, (err, result) => {
        if (err) {
            console.log(err)
            con.end()
            return;
        }
    })
    con.query(NumAppearanceINSERTSQL, (err, result) => {
        if (err) {
            console.log(err)
            con.end()
            return;
        }
    })
}

function calculateOPScore() {
    //for each champion
    //calculate OPScore based on win rate, ban rate, pick rate
}

calculateChampionStatistics()