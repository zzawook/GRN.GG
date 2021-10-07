import { getPlayerHistory, getMatchData, getOutdatedPlayers, checkGameInDB, updatedPlayer } from '../components/calls.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mysql2 = require('mysql2/promise');
const mysql = require('mysql');

async function findMoreData() {
    let gameList = [];
    let rankedList = [];

    let con = mysql2.createPool({
        host: '165.22.223',
        user: 'kjaehyeok21',
        password: 'airbusa380861',
        database: 'LOLGRN',
        port: '/var/run/mysqld/mysqld.sock'
    });
    const connection = await con.getConnection(async conn => conn);

    //fetch 15 players that are not updated since [1 day] in the order of last update date
    let outdatedPlayersCall = await getOutdatedPlayers(connection);
    if (!outdatedPlayersCall['success']) {
        console.log("Find More Data failed to fetch outdated players");
        findMoreData();
    }
    let outdatedPlayers = outdatedPlayersCall['content'];
    console.log('Outdated Players length: ' + outdatedPlayers.length.toString())
    let playerLength = 0;
    if (outdatedPlayers.length > 8000) {
        playerLength = 8000;
        outdatedPlayers.splice(playerLength, outdatedPlayers.length - playerLength)
        console.log('Reset Players length: ' + outdatedPlayers.length.toString())
    }
    else {
        playerLength = outdatedPlayers.length;
    }
    let count= 0;
    //for each player, fetch 20 recent match data
    for (let i = 0; i < playerLength; i++) {
        if (count < 50000) {
            console.log(i.toString() + "th player")
            let historyCall = await getPlayerHistory(outdatedPlayers[i]['id'], outdatedPlayers[i]['region'], 0, 20, true);
            if (!historyCall['success']) {
                continue;
            }
            let tempGameList = historyCall['content']
            for (let j = 0; j < tempGameList.length; j++)
            {
                let inDB = await checkGameInDB(tempGameList[j], connection);
                if (!inDB) {
                    gameList.push( {'id': tempGameList[j], 'region': outdatedPlayers[i]['region']} )
                    count = count + 1;
                }
            }
            updatedPlayer(outdatedPlayers[i]['id'], outdatedPlayers[i]['region'], connection)
        }
        else {
            break;
        }
    }
    console.log('GameList length: ' + gameList.length.toString())
    //for each match, get match data
    for (let i = 0; i < gameList.length; i++) {
        console.log(i.toString() + 'th game fetching')
        let matchCall = await getMatchData(gameList[i]['id'], gameList[i]['region'], true);
        if (!matchCall['success']) {
            continue;
        }
        rankedList.push(matchCall["content"])
    }
    console.log('RankedList length: ' + rankedList.length.toString())
    
    
    
    //for each match
    for (let i = 0; i < rankedList.length; i++) {
        const matchId = rankedList[i]['gameId'];
        console.log("Insert match ID: " + matchId)
        const regionId = rankedList[i]['platformId'];

        //record two team data
        const matchRecord = {}
        for (let k = 0; k < rankedList[i]['teams'].length; k++)
        {
            console.log(i + 'th record processing');
            matchRecord['gameId'] = matchId
            matchRecord['regionId'] = regionId
            matchRecord['teamId'] = rankedList[i]['teams'][k]['teamId']
            matchRecord['gameCreation'] = Math.round(rankedList[i]['gameCreation']/1000)
            matchRecord['gameDuration'] = rankedList[i]['gameDuration']
            
            if (rankedList[i]['teams'][k]['teamId'] == 100) {
                if (rankedList[i]['teams'][k]['win'] == 'Win')
                {
                    matchRecord['win'] = 100;
                }
                else {
                    matchRecord['win'] = 200;
                }
                matchRecord['t1TowerKills'] = rankedList[i]['teams'][k]['towerKills']
                matchRecord['t1InhibitorKills'] = rankedList[i]['teams'][k]['inhibitorKills']
                matchRecord['t1BaronKills'] = rankedList[i]['teams'][k]['baronKills']    
                matchRecord['t1DragonKills'] = rankedList[i]['teams'][k]['dragonKills']
                matchRecord['t1HeraldKills'] = rankedList[i]['teams'][k]['riftHeraldKills']
                let banCount = 1;
                for (let a = 0; a < rankedList[i]['teams'][k]['bans'].length; a++) {
                    matchRecord['ban' + banCount.toString()] = rankedList[i]['teams'][k]['bans'][a]['championId']
                    banCount = banCount + 1
                }
                for (let a = 6 - banCount; a >= banCount; a--) {
                    matchRecord['ban' + a.toString()] = -1;
                }
            }
            else {
                if (rankedList[i]['teams'][k]['win'] == 'Win')
                {
                    matchRecord['win'] = 200;
                }
                else {
                    matchRecord['win'] = 100;
                }
                matchRecord['t2TowerKills'] = rankedList[i]['teams'][k]['towerKills']
                matchRecord['t2InhibitorKills'] = rankedList[i]['teams'][k]['inhibitorKills']
                matchRecord['t2BaronKills'] = rankedList[i]['teams'][k]['baronKills']    
                matchRecord['t2DragonKills'] = rankedList[i]['teams'][k]['dragonKills']
                matchRecord['t2HeraldKills'] = rankedList[i]['teams'][k]['riftHeraldKills']
                let banCount = 6;
                for (let a = 0; a < rankedList[i]['teams'][k]['bans'].length; a++) {
                    matchRecord['ban' + banCount.toString()] = rankedList[i]['teams'][k]['bans'][a]['championId']
                    banCount = banCount + 1
                }
                for (let a = 16 - banCount; a >= banCount; a--) {
                    matchRecord['ban' + a.toString()] = -1;
                }
            }
        }

        const userMatchRecords = [];
        //record 10 player data
        for (let j = 0; j < rankedList[i]['participants'].length; j++) {
            const tempId = rankedList[i]['participants'][j]['participantId']
            const participantRecord = {}
            let accountId = ""
            for (let k = 0; k < rankedList[i]['participantIdentities'].length; k++) {
                if (rankedList[i]['participantIdentities'][k]['participantId'] == tempId) {
                    accountId = rankedList[i]['participantIdentities'][k]['player']['accountId']
                    participantRecord['userId'] = accountId
                }
            }
            participantRecord['gameId'] = matchId
            participantRecord['champId'] = rankedList[i]['participants'][j]['championId']
            participantRecord['win'] = rankedList[i]['participants'][j]['stats']['win']
            participantRecord['spell1'] = rankedList[i]['participants'][j]['spell1Id']
            participantRecord['spell2'] = rankedList[i]['participants'][j]['spell2Id']
            participantRecord['item1'] = rankedList[i]['participants'][j]['stats']['item0']
            participantRecord['item2'] = rankedList[i]['participants'][j]['stats']['item1']
            participantRecord['item3'] = rankedList[i]['participants'][j]['stats']['item2']
            participantRecord['item4'] = rankedList[i]['participants'][j]['stats']['item3']
            participantRecord['item5'] = rankedList[i]['participants'][j]['stats']['item4']
            participantRecord['item6'] = rankedList[i]['participants'][j]['stats']['item5']
            participantRecord['ward'] = rankedList[i]['participants'][j]['stats']['item6']
            participantRecord['kills'] = rankedList[i]['participants'][j]['stats']['kills']
            participantRecord['deaths'] = rankedList[i]['participants'][j]['stats']['deaths']
            participantRecord['assists'] = rankedList[i]['participants'][j]['stats']['assists']
            participantRecord['visionScore'] = rankedList[i]['participants'][j]['stats']['visionScore']
            participantRecord['visionWard'] = rankedList[i]['participants'][j]['stats']['visionWardsBoughtInGame']
            participantRecord['firstBlood'] = rankedList[i]['participants'][j]['stats']['firstBloodKill']
            participantRecord['firstTower'] = rankedList[i]['participants'][j]['stats']['firstTowerKill']
            participantRecord['cs'] = rankedList[i]['participants'][j]['stats']['totalMinionsKilled'] + rankedList[i]['participants'][j]['stats']['neutralMinionsKilled']
            participantRecord['pRune0'] = rankedList[i]['participants'][j]['stats']['perk0']
            participantRecord['pRune1'] = rankedList[i]['participants'][j]['stats']['perk1']
            participantRecord['pRune2'] = rankedList[i]['participants'][j]['stats']['perk2']
            participantRecord['pRune3'] = rankedList[i]['participants'][j]['stats']['perk3']
            participantRecord['sRune0'] = rankedList[i]['participants'][j]['stats']['perk4']
            participantRecord['sRune1'] = rankedList[i]['participants'][j]['stats']['perk5']
            participantRecord['pRuneStyle'] = rankedList[i]['participants'][j]['stats']['perkPrimaryStyle']
            participantRecord['sRuneStyle'] = rankedList[i]['participants'][j]['stats']['perkSubStyle']
            participantRecord['championDmg'] = rankedList[i]['participants'][j]['stats']['totalDamageDealtToChampions']
            participantRecord['championAPDmg'] = rankedList[i]['participants'][j]['stats']['magicDamageDealtToChampions']
            participantRecord['championADDmg'] = rankedList[i]['participants'][j]['stats']['physicalDamageDealtToChampions']
            participantRecord['championTrueDmg'] = rankedList[i]['participants'][j]['stats']['trueDamageDealtToChampions']
            participantRecord['totalDamageTaken'] = rankedList[i]['participants'][j]['stats']['totalDamageTaken']
            participantRecord['APDamageTaken'] = rankedList[i]['participants'][j]['stats']['magicalDamageTaken']
            participantRecord['ADDamageTaken'] = rankedList[i]['participants'][j]['stats']['physicalDamageTaken']
            participantRecord['largestKillingSpree'] = rankedList[i]['participants'][j]['stats']['largestKillingSpree']
            participantRecord['largestMultiKill'] = rankedList[i]['participants'][j]['stats']['largestMultiKill']
            participantRecord['killingSprees'] = rankedList[i]['participants'][j]['stats']['killingSprees']
            participantRecord['doubleKills'] = rankedList[i]['participants'][j]['stats']['doubleKills']
            participantRecord['tripleKills'] = rankedList[i]['participants'][j]['stats']['tripleKills']
            participantRecord['quadraKills'] = rankedList[i]['participants'][j]['stats']['quadraKills']
            participantRecord['pentaKills'] = rankedList[i]['participants'][j]['stats']['pentaKills']
            participantRecord['level'] = rankedList[i]['participants'][j]['stats']['champLevel']
            participantRecord['goldEarned'] = rankedList[i]['participants'][j]['stats']['goldEarned']
            participantRecord['turret'] = rankedList[i]['participants'][j]['stats']['turretKills']
            participantRecord['inhibitor'] = rankedList[i]['participants'][j]['stats']['inhibitorKills']
            let role = rankedList[i]['participants'][j]['timeline']['role']
            let lane = rankedList[i]['participants'][j]['timeline']['lane']
            if (lane == "MIDDLE" && (role == "SOLO" || participantRecord['spell1'] == 14 || participantRecord['spell2'] == 14 || participantRecord['spell1'] == 12 || participantRecord['spell2'] == 12)) {
                participantRecord['role'] = "MID"
            }
            else if (lane == "TOP" && (role == "SOLO" || participantRecord['spell1'] == 14 || participantRecord['spell1'] == 12 || participantRecord['spell2'] == 14 || participantRecord['spell2'] == 12)) {
                participantRecord['role'] = "TOP"
            }
            else if (lane == "JUNGLE" && (role == "NONE" || participantRecord['spell1'] == 11)) {
                participantRecord['role'] = "JGL"
            }
            else if (lane == "BOTTOM") {
                if (role == "DUO_SUPPORT") {
                    participantRecord['role'] = "SPT"
                }
                else if (role == "DUO_CARRY") {
                    participantRecord['role'] = "ADC"    
                }
                else if (participantRecord['spell1'] == 7 || participantRecord['spell2'] == 7) {
                    participantRecord['role'] = "ADC"
                }
                else if (participantRecord['spell1'] == 3 || participantRecord['spell2'] == 3 || participantRecord['spell1'] == 14 || participantRecord['spell2'] == 14) {
                    participantRecord['role'] = "SPT"
                }
                else {
                    participantRecord['role'] = "N/A"
                }
            }
            else {
                participantRecord['role'] = "N/A"
            }
            userMatchRecords.push(participantRecord);
        }
        
        let sql = `INSERT INTO matchDB (gameId, gameCreation, gameDuration, regionId, win, ban1, ban2, ban3, ban4, ban5, ban6, ban7, ban8, ban9, ban10, t1TowerKills, t1InhibitorKills, t1BaronKills, t1DragonKills, t1HeraldKills, t2TowerKills, t2InhibitorKills, t2BaronKills, t2DragonKills, t2HeraldKills) VALUES (${matchRecord['gameId']}, ${matchRecord['gameCreation']}, ${matchRecord['gameDuration']}, "${matchRecord['regionId']}", ${matchRecord['win']}, ${matchRecord['ban1']}, ${matchRecord['ban2']}, ${matchRecord['ban3']}, ${matchRecord['ban4']}, ${matchRecord['ban5']}, ${matchRecord['ban6']}, ${matchRecord['ban7']}, ${matchRecord['ban8']}, ${matchRecord['ban9']}, ${matchRecord['ban10']}, ${matchRecord['t1TowerKills']}, ${matchRecord['t1InhibitorKills']}, ${matchRecord['t1BaronKills']}, ${matchRecord['t1DragonKills']}, ${matchRecord['t1HeraldKills']}, ${matchRecord['t2TowerKills']}, ${matchRecord['t2InhibitorKills']}, ${matchRecord['t2BaronKills']}, ${matchRecord['t2DragonKills']}, ${matchRecord['t2HeraldKills']}) ON DUPLICATE KEY UPDATE gameId = ${matchRecord['gameId']}`
        try {
            const [rows] = await connection.query(sql)
        }
        catch(err1) {
            console.log(err1)
        }
        for (let z = 0; z < userMatchRecords.length; z++) {
            try {
                let sql2 = `INSERT INTO matchRecordDB (userId, gameId, regionId, champId, role, win, spell1, spell2, item1, item2, item3, item4, item5, item6, ward, kills, deaths, assists, visionScore, cs, pRune0, pRune1, pRune2, pRune3, sRune0, sRune1, pRuneStyle, sRuneStyle, championDmg, championAPDmg, championADDmg, championTrueDmg, level, goldEarned, turret, inhibitor, largestKillingSprees, largestMultiKill, killingSprees, doubleKills, tripleKills, quadraKills, pentaKills) VALUES(${userMatchRecords[z]['userId']}, ${userMatchRecords[z]['gameId']}, "${regionId}", ${userMatchRecords[z]['champId']}, "${userMatchRecords[z]['role']}", ${userMatchRecords[z]['win']}, ${userMatchRecords[z]['spell1']}, ${userMatchRecords[z]['spell2']}, ${userMatchRecords[z]['item1']}, ${userMatchRecords[z]['item2']}, ${userMatchRecords[z]['item3']}, ${userMatchRecords[z]['item4']}, ${userMatchRecords[z]['item5']}, ${userMatchRecords[z]['item6']}, ${userMatchRecords[z]['ward']}, ${userMatchRecords[z]['kills']}, ${userMatchRecords[z]['deaths']}, ${userMatchRecords[z]['assists']}, ${userMatchRecords[z]['visionScore']}, ${userMatchRecords[z]['cs']}, ${userMatchRecords[z]['pRune0']}, ${userMatchRecords[z]['pRune1']}, ${userMatchRecords[z]['pRune2']},  ${userMatchRecords[z]['pRune3']}, ${userMatchRecords[z]['sRune0']}, ${userMatchRecords[z]['sRune1']}, ${userMatchRecords[z]['pRuneStyle']}, ${userMatchRecords[z]['sRuneStyle']}, ${userMatchRecords[z]['championDmg']}, ${userMatchRecords[z]['championAPDmg']}, ${userMatchRecords[z]['championADDmg']}, ${userMatchRecords[z]['championTrueDmg']}, ${userMatchRecords[z]['level']}, ${userMatchRecords[z]['goldEarned']}, ${userMatchRecords[z]['turret']}, ${userMatchRecords[z]['inhibitor']}, ${userMatchRecords[z]['largestKillingSpree']}, ${userMatchRecords[z]['largestMultiKill']}, ${userMatchRecords[z]['killingSprees']}, ${userMatchRecords[z]['doubleKills']}, ${userMatchRecords[z]['tripleKills']}, ${userMatchRecords[z]['quadraKills']}, ${userMatchRecords[z]['pentaKills']}) ON DUPLICATE KEY UPDATE gameId = ${userMatchRecords[z]['gameId']}`;
                let [rows2] = await connection.query(sql2)
            }
            catch(err2) {
                console.log(err2)
            }
        }
    }
    //Insert User Begin
    console.log('Insert User Begin')
    const accountIdList = []
    if (rankedList.length == 0) {
        console.log('no match list')
        findMoreData();
    }
    let regionId = 'SG'
    for (let i = 0; i < rankedList.length; i++) {
        regionId = rankedList[i]['platformId'];
        for (let j = 0; j < rankedList[i]['participants'].length; j++) {
            const participantId = rankedList[i]['participants'][j]['participantId']
            for (let k = 0; k < rankedList[i]['participantIdentities'].length; k++) {
                if (rankedList[i]['participantIdentities'][k]['participantId'] == participantId) {
                    accountIdList.push(rankedList[i]['participantIdentities'][k]['player']['accountId'])
                    break;
                }
            }
        }
    }
    const ts = Date.now();
    console.log("Total account ids: " + accountIdList.length.toString())
    for (let i = 0; i < accountIdList.length; i++) {
        let sql = `INSERT INTO userDB (id, region, registerDate, lastUpdated) VALUES(${accountIdList[i]}, "${regionId}", ${ts}, ${ts}) ON DUPLICATE KEY UPDATE lastUpdated = ${ts}`;
        try {
            const [rows] = await connection.query(sql)
            console.log(i.toString() + 'th user inserted');
        }
        catch(err1) {
            console.log(err1)
        }
        if (i == accountIdList.length - 1) {
            con.end()
            console.log("Insert user done")
        }
    }
    connection.release();
    findMoreData()
}

export default class IDFinder {
    constructor() {
        console.log('IDFinder running')
        
        const interval = setInterval(async () => {
            const now = new Date();
            const day = now.getUTCDate()
            const month = now.getUTCMonth()
            const year = now.getUTCFullYear()
            console.log("IDFinding: " + year.toString() + ", " + month.toString() + ", " + day.toString());
            await findMoreData()
        }, 60 * 60 * 0.5 * 1000);
    }
}
findMoreData()
//const idScheduler = new IDFinder();