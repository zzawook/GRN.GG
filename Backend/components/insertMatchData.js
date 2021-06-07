const { workerData, parentPort } = require('worker_threads')

export default async function handleData() {

    const matchData = workerData;
    const con = mysql.createConnection({
        host: 'aiscstudents.com',
        user: 'aiscstudentsClient',
        password: 'airbusa3501000',
        database: 'aiscstudents',
    });
    con.connect(function (err) {
        if (err) {
            throw err;
        }
        console.log("Connected HAHA")
    });

    //for each match
    for (let i = 0; i < matchData.length; i++) {
        const matchRecords = [];
        const matchId = matchData[i]['gameId'];
        const regionId=matchData[i]['platformId'];

        //record two team data
        const matchRecord = {}
        for (let k = 0; k<matchData[i][teams].length; k++)
        {
            matchRecord['gameId'] = matchId
            matchRecord['teamId'] = matchData[i]['teams']['teamId']
            matchRecord['gameCreation'] = matchData[i]['gameCreation']
            matchRecord['gameDuration'] = matchData[i]['gameDuration']
            matchRecord['win'] = matchData[i]['teams']['win']
            matchRecord['ban1'] = matchData[i]['teams']['ban'][0]['championId']
            matchRecord['ban2'] = matchData[i]['teams']['ban'][1]['championId']
            matchRecord['ban3'] = matchData[i]['teams']['ban'][2]['championId']
            matchRecord['ban4'] = matchData[i]['teams']['ban'][3]['championId']
            matchRecord['ban5'] = matchData[i]['teams']['ban'][4]['championId']
            matchRecord['towerKills'] = matchData[i]['teams']['towerKills']
            matchRecord['baronKills'] = matchData[i]['teams']['baronKills']
            matchRecord['dragonKills'] = matchData[i]['teams']['dragonKills']
            matchRecords.push(matchRecord)
        }

        const userMatchRecords = [];
        //record 10 player data
        for (let j = 0; j < matchData[i]['participants'].length; j++) {
            const tempId = matchData[i]['participants'][j]['participantId']
            const participantRecord = {}
            let accountId = ""
            for (let k = 0; k < matchData[i]['participantIdentities'].length; k++) {
                if (matchData[i]['participantIdentities'][k]['participantId'] == tempId) {
                    accountId = matchData[i]['participantIdentities'][k]['player']['accountId']
                    participantRecord['userId'] = accountId
                }
            }
            participantRecord['gameId'] = matchId
            participantRecord['champId'] = matchData[i]['participants'][j]['championId']
            if (tempId <= 5) {
                const teamId = 0;
            }
            else {
                const teamId = 1;
            }
            participantRecord['win'] = matchData[i]['participants'][j]['stats']['win']
            participantRecord['spell1'] = matchData[i]['participants'][j]['spell1Id']
            participantRecord['spell2'] = matchData[i]['participants'][j]['spell2Id']
            participantRecord['item1'] = matchData[i]['participants'][j]['stats']['item0']
            participantRecord['item2'] = matchData[i]['participants'][j]['stats']['item1']
            participantRecord['item3'] = matchData[i]['participants'][j]['stats']['item2']
            participantRecord['item4'] = matchData[i]['participants'][j]['stats']['item3']
            participantRecord['item5'] = matchData[i]['participants'][j]['stats']['item4']
            participantRecord['item6'] = matchData[i]['participants'][j]['stats']['item5']
            participantRecord['ward'] = matchData[i]['participants'][j]['stats']['item6']
            participantRecord['kills'] = matchData[i]['participants'][j]['stats']['kills']
            participantRecord['deaths'] = matchData[i]['participants'][j]['stats']['deaths']
            participantRecord['assists'] = matchData[i]['participants'][j]['stats']['assists']
            participantRecord['visionScore'] = matchData[i]['participants'][j]['stats']['visionScore']
            participantRecord['cs'] = matchData[i]['participants'][j]['stats']['totalMinionsKilled'] + matchData[i]['participants'][j]['stats']['neutralMinionsKilled']
            participantRecord['pRune0'] = matchData[i]['participants'][j]['stats']['perk0']
            participantRecord['pRune1'] = matchData[i]['participants'][j]['stats']['perk1']
            participantRecord['pRune2'] = matchData[i]['participants'][j]['stats']['perk2']
            participantRecord['pRune3'] = matchData[i]['participants'][j]['stats']['perk3']
            participantRecord['sRune0'] = matchData[i]['participants'][j]['stats']['perk4']
            participantRecord['sRune1'] = matchData[i]['participants'][j]['stats']['perk5']
            participantRecord['pRuneStyle'] = matchData[i]['participants'][j]['stats']['perkPrimaryStyle']
            participantRecord['sRuneStyle'] = matchData[i]['participants'][j]['stats']['perkSubStyle']
            participantRecord['championDmg'] = matchData[i]['participants'][j]['stats']['totalDamageDealtToChampions']
            participantRecord['championAPDmg'] = matchData[i]['participants'][j]['stats']['magicDamageDealtToChampions']
            participantRecord['championADDmg'] = matchData[i]['participants'][j]['stats']['physicalDamageDealtToChampions']
            participantRecord['championTrueDmg'] = matchData[i]['participants'][j]['stats']['trueDamageDealtToChampions']
            participantRecord['level'] = matchData[i]['participants'][j]['stats']['champLevel']
            participantRecord['goldEarned'] = matchData[i]['participants'][j]['stats']['goldEarned']
            participantRecord['turret'] = matchData[i]['participants'][j]['stats']['turretKills']
            userMatchRecords.push(participantRecord);
        }

        for (let i = 0; i < matchRecords.length; i++) {
            let sql = `INSERT INTO matchDB (gameId, gameCreation, gameDuration, regionId, teamId, win, ban1, ban2, ban3, ban4, ban5, towerKills, baronKills, dragonKills) VALUES ()`
            con.query(sql, function(err, result) {
                if (err) {
                    console.log(err);
                }
            })
        }
        for (let i = 0; i < userMatchRecords.length; i++) {
            let sql = `INSERT INTO matchRecordDB (userId, gameId, regionId, champId, win, spell1, spell2, item1, item2, item3, item4, item5, item6, ward, kills, deaths, assists, visionScore, cs, pRune0, pRune1, pRune2, pRune3, sRune0, sRune1, pRuneStyle, sRuneStyle, championDmg, championAPDmg, championADDmg, championTrueDmg, level, goldEarned, turret, baron, herald, drag, drag1, drag2, drag3, drag4, recordId, ) VALUES()`;
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
}

handleData();