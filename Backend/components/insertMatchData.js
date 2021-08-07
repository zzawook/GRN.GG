import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { workerData, parentPort } = require('worker_threads')
const mysql = require('mysql')
const mysql2 = require('mysql2/promise')

export default async function handleData() {
    console.log("handleData Called")
    console.log("Match Data Length:")
    console.log(workerData.length)
    const con = mysql2.createPool({
        host: '165.22.223',
        user: 'kjaehyeok21',
        password: 'airbusa380861',
        database: 'LOLGRN',
        port: '/var/run/mysqld/mysqld.sock'
    });
    
    const connection = await con.getConnection(async conn => conn);
    //for each match
    for (let i = 0; i < workerData.length; i++) {
        const matchId = workerData[i]['gameId'];
        console.log("Insert match ID: " + matchId)
        const regionId = workerData[i]['platformId'];

        //record two team data
        const matchRecord = {}
        for (let k = 0; k<workerData[i]['teams'].length; k++)
        {
            matchRecord['gameId'] = matchId
            matchRecord['regionId'] = regionId
            matchRecord['teamId'] = workerData[i]['teams'][k]['teamId']
            matchRecord['gameCreation'] = Math.round(workerData[i]['gameCreation']/1000)
            matchRecord['gameDuration'] = workerData[i]['gameDuration']
            
            if (workerData[i]['teams'][k]['teamId'] == 100) {
                if (workerData[i]['teams'][k]['win'] == 'Win')
                {
                    matchRecord['win'] = 100;
                }
                else {
                    matchRecord['win'] = 200;
                }
                matchRecord['t1TowerKills'] = workerData[i]['teams'][k]['towerKills']
                matchRecord['t1InhibitorKills'] = workerData[i]['teams'][k]['inhibitorKills']
                matchRecord['t1BaronKills'] = workerData[i]['teams'][k]['baronKills']    
                matchRecord['t1DragonKills'] = workerData[i]['teams'][k]['dragonKills']
                matchRecord['t1HeraldKills'] = workerData[i]['teams'][k]['riftHeraldKills']
                let banCount = 1;
                for (let a = 0; a < workerData[i]['teams'][k]['bans'].length; a++) {
                    matchRecord['ban' + banCount.toString()] = workerData[i]['teams'][k]['bans'][a]['championId']
                    banCount = banCount + 1
                }
                for (let a = 6 - banCount; a >= banCount; a--) {
                    matchRecord['ban' + a.toString()] = -1;
                }
            }
            else {
                if (workerData[i]['teams'][k]['win'] == 'Win')
                {
                    matchRecord['win'] = 200;
                }
                else {
                    matchRecord['win'] = 100;
                }
                matchRecord['t2TowerKills'] = workerData[i]['teams'][k]['towerKills']
                matchRecord['t2InhibitorKills'] = workerData[i]['teams'][k]['inhibitorKills']
                matchRecord['t2BaronKills'] = workerData[i]['teams'][k]['baronKills']    
                matchRecord['t2DragonKills'] = workerData[i]['teams'][k]['dragonKills']
                matchRecord['t2HeraldKills'] = workerData[i]['teams'][k]['riftHeraldKills']
                let banCount = 6;
                for (let a = 0; a < workerData[i]['teams'][k]['bans'].length; a++) {
                    matchRecord['ban' + banCount.toString()] = workerData[i]['teams'][k]['bans'][a]['championId']
                    banCount = banCount + 1
                }
                for (let a = 16 - banCount; a >= banCount; a--) {
                    matchRecord['ban' + a.toString()] = -1;
                }
            }
        }

        const userMatchRecords = [];
        //record 10 player data
        for (let j = 0; j < workerData[i]['participants'].length; j++) {
            const tempId = workerData[i]['participants'][j]['participantId']
            const participantRecord = {}
            let accountId = ""
            for (let k = 0; k < workerData[i]['participantIdentities'].length; k++) {
                if (workerData[i]['participantIdentities'][k]['participantId'] == tempId) {
                    accountId = workerData[i]['participantIdentities'][k]['player']['accountId']
                    participantRecord['userId'] = accountId
                }
            }
            participantRecord['gameId'] = matchId
            participantRecord['champId'] = workerData[i]['participants'][j]['championId']
            if (tempId <= 5) {
                const teamId = 0;
            }
            else {
                const teamId = 1;
            }
            
            participantRecord['win'] = workerData[i]['participants'][j]['stats']['win']
            participantRecord['spell1'] = workerData[i]['participants'][j]['spell1Id']
            participantRecord['spell2'] = workerData[i]['participants'][j]['spell2Id']
            participantRecord['item1'] = workerData[i]['participants'][j]['stats']['item0']
            participantRecord['item2'] = workerData[i]['participants'][j]['stats']['item1']
            participantRecord['item3'] = workerData[i]['participants'][j]['stats']['item2']
            participantRecord['item4'] = workerData[i]['participants'][j]['stats']['item3']
            participantRecord['item5'] = workerData[i]['participants'][j]['stats']['item4']
            participantRecord['item6'] = workerData[i]['participants'][j]['stats']['item5']
            participantRecord['ward'] = workerData[i]['participants'][j]['stats']['item6']
            participantRecord['kills'] = workerData[i]['participants'][j]['stats']['kills']
            participantRecord['deaths'] = workerData[i]['participants'][j]['stats']['deaths']
            participantRecord['assists'] = workerData[i]['participants'][j]['stats']['assists']
            participantRecord['visionScore'] = workerData[i]['participants'][j]['stats']['visionScore']
            participantRecord['visionWard'] = workerData[i]['participants'][j]['stats']['visionWardsBoughtInGame']
            participantRecord['firstBlood'] = workerData[i]['participants'][j]['stats']['firstBloodKill']
            participantRecord['firstTower'] = workerData[i]['participants'][j]['stats']['firstTowerKill']
            participantRecord['cs'] = workerData[i]['participants'][j]['stats']['totalMinionsKilled'] + workerData[i]['participants'][j]['stats']['neutralMinionsKilled']
            participantRecord['pRune0'] = workerData[i]['participants'][j]['stats']['perk0']
            participantRecord['pRune1'] = workerData[i]['participants'][j]['stats']['perk1']
            participantRecord['pRune2'] = workerData[i]['participants'][j]['stats']['perk2']
            participantRecord['pRune3'] = workerData[i]['participants'][j]['stats']['perk3']
            participantRecord['sRune0'] = workerData[i]['participants'][j]['stats']['perk4']
            participantRecord['sRune1'] = workerData[i]['participants'][j]['stats']['perk5']
            participantRecord['pRuneStyle'] = workerData[i]['participants'][j]['stats']['perkPrimaryStyle']
            participantRecord['sRuneStyle'] = workerData[i]['participants'][j]['stats']['perkSubStyle']
            participantRecord['championDmg'] = workerData[i]['participants'][j]['stats']['totalDamageDealtToChampions']
            participantRecord['championAPDmg'] = workerData[i]['participants'][j]['stats']['magicDamageDealtToChampions']
            participantRecord['championADDmg'] = workerData[i]['participants'][j]['stats']['physicalDamageDealtToChampions']
            participantRecord['championTrueDmg'] = workerData[i]['participants'][j]['stats']['trueDamageDealtToChampions']
            participantRecord['totalDamageTaken'] = workerData[i]['participants'][j]['stats']['totalDamageTaken']
            participantRecord['APDamageTaken'] = workerData[i]['participants'][j]['stats']['magicalDamageTaken']
            participantRecord['ADDamageTaken'] = workerData[i]['participants'][j]['stats']['physicalDamageTaken']
            participantRecord['largestKillingSpree'] = workerData[i]['participants'][j]['stats']['largestKillingSpree']
            participantRecord['largestMultiKill'] = workerData[i]['participants'][j]['stats']['largestMultiKill']
            participantRecord['killingSprees'] = workerData[i]['participants'][j]['stats']['killingSprees']
            participantRecord['doubleKills'] = workerData[i]['participants'][j]['stats']['doubleKills']
            participantRecord['tripleKills'] = workerData[i]['participants'][j]['stats']['tripleKills']
            participantRecord['quadraKills'] = workerData[i]['participants'][j]['stats']['quadraKills']
            participantRecord['pentaKills'] = workerData[i]['participants'][j]['stats']['pentaKills']
            participantRecord['level'] = workerData[i]['participants'][j]['stats']['champLevel']
            participantRecord['goldEarned'] = workerData[i]['participants'][j]['stats']['goldEarned']
            participantRecord['turret'] = workerData[i]['participants'][j]['stats']['turretKills']
            participantRecord['inhibitor'] = workerData[i]['participants'][j]['stats']['inhibitorKills']
            let role = workerData[i]['participants'][j]['timeline']['role']
            let lane = workerData[i]['participants'][j]['timeline']['lane']
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
        try {
            for (let z = 0; z < userMatchRecords.length; z++) {
                let sql2 = `INSERT INTO matchRecordDB (userId, gameId, regionId, champId, role, win, spell1, spell2, item1, item2, item3, item4, item5, item6, ward, kills, deaths, assists, visionScore, cs, pRune0, pRune1, pRune2, pRune3, sRune0, sRune1, pRuneStyle, sRuneStyle, championDmg, championAPDmg, championADDmg, championTrueDmg, level, goldEarned, turret, inhibitor, largestKillingSprees, largestMultiKill, killingSprees, doubleKills, tripleKills, quadraKills, pentaKills) VALUES(${userMatchRecords[z]['userId']}, ${userMatchRecords[z]['gameId']}, "${regionId}", ${userMatchRecords[z]['champId']}, "${userMatchRecords[z]['role']}", ${userMatchRecords[z]['win']}, ${userMatchRecords[z]['spell1']}, ${userMatchRecords[z]['spell2']}, ${userMatchRecords[z]['item1']}, ${userMatchRecords[z]['item2']}, ${userMatchRecords[z]['item3']}, ${userMatchRecords[z]['item4']}, ${userMatchRecords[z]['item5']}, ${userMatchRecords[z]['item6']}, ${userMatchRecords[z]['ward']}, ${userMatchRecords[z]['kills']}, ${userMatchRecords[z]['deaths']}, ${userMatchRecords[z]['assists']}, ${userMatchRecords[z]['visionScore']}, ${userMatchRecords[z]['cs']}, ${userMatchRecords[z]['pRune0']}, ${userMatchRecords[z]['pRune1']}, ${userMatchRecords[z]['pRune2']},  ${userMatchRecords[z]['pRune3']}, ${userMatchRecords[z]['sRune0']}, ${userMatchRecords[z]['sRune1']}, ${userMatchRecords[z]['pRuneStyle']}, ${userMatchRecords[z]['sRuneStyle']}, ${userMatchRecords[z]['championDmg']}, ${userMatchRecords[z]['championAPDmg']}, ${userMatchRecords[z]['championADDmg']}, ${userMatchRecords[z]['championTrueDmg']}, ${userMatchRecords[z]['level']}, ${userMatchRecords[z]['goldEarned']}, ${userMatchRecords[z]['turret']}, ${userMatchRecords[z]['inhibitor']}, ${userMatchRecords[z]['largestKillingSpree']}, ${userMatchRecords[z]['largestMultiKill']}, ${userMatchRecords[z]['killingSprees']}, ${userMatchRecords[z]['doubleKills']}, ${userMatchRecords[z]['tripleKills']}, ${userMatchRecords[z]['quadraKills']}, ${userMatchRecords[z]['pentaKills']}) ON DUPLICATE KEY UPDATE gameId = ${userMatchRecords[z]['gameId']}`;
                let [rows2] = await connection.query(sql2)
                if (z == userMatchRecords.length - 1) {
                    connection.release()
                }
            }
        }
        catch(err2) {
            console.log(err2)
        }
    }
}

handleData();