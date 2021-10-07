import { stat } from 'fs';
import { createRequire } from 'module';
import { version } from 'os';
const require = createRequire(import.meta.url);

const fetch = require("node-fetch");
const mysql = require('mysql');
const mysql2 = require('mysql2/promise');

export async function fetchTierList(regions) {
    let con = mysql2.createPool({
        host: '165.22.223',
        user: 'kjaehyeok21',
        password: 'airbusa380861',
        database: 'LOLGRN',
        port: '/var/run/mysqld/mysqld.sock'
    });
    const connection = await con.getConnection(async conn => conn);
    con.on('error', (err) => {
        if (err.code == "PROTOCOL_CONNECTION_LOST") {
            con.connect()
        }
        else {
            throw(err)
        }
    })
    let topSQL = 'SELECT champId, champName, position, region, gScore, winRate, winCount, pickRate, banRate, banCount, pickCount FROM statDB WHERE position = "TOP"'
    let jglSQL = 'SELECT champId, champName, position, region, gScore, winRate, winCount, pickRate, banRate, banCount, pickCount FROM statDB WHERE position = "JGL"'
    let midSQL = 'SELECT champId, champName, position, region, gScore, winRate, winCount, pickRate, banRate, banCount, pickCount FROM statDB WHERE position = "MID"'
    let adcSQL = 'SELECT champId, champName, position, region, gScore, winRate, winCount, pickRate, banRate, banCount, pickCount FROM statDB WHERE position = "ADC"'
    let sptSQL = 'SELECT champId, champName, position, region, gScore, winRate, winCount, pickRate, banRate, banCount, pickCount FROM statDB WHERE position = "SPT"'
    const tierList = {}
    tierList['COUNT'] = {}
    for (let i = 0; i < regions.length; i++) {
        let regionSQL = `SELECT count(gameId) as count from matchDB WHERE regionId = "${regions[i].toString()}"`
        try {
            const [rows] = await connection.query(regionSQL)
            const result = rows[0]['count']
            tierList['COUNT'][regions[i].toString()] = result
        }
        catch(err1) {
            console.log(err1)
            con.end()
            return;
        }
    }
    const versionSQL = 'SELECT patchVersion from patchDB'
    try {
        const [rows] = await connection.query(versionSQL)
        const result = rows[0]['patchVersion']
        tierList['version'] = result
    }
    catch(err1) {
        console.log(err1)
        con.end()
        return;
    }
    //TOP TIERLIST
    try {
        const [rows] = await connection.query(topSQL)
        tierList['TOP'] = rows;
    }
    catch(err1) {
        console.log(err1)
        con.end()
        return;
    }
    //JGL TIERLIST
    try {
        const [rows] = await connection.query(jglSQL)
        tierList['JGL'] = rows;
    }
    catch(err1) {
        console.log(err1)
        con.end()
        return;
    }
    //MID TIERLIST
    try {
        const [rows] = await connection.query(midSQL)
        tierList['MID'] = rows;
    }
    catch(err1) {
        console.log(err1)
        con.end()
        return;
    }
    //ADC TIERLIST
    try {
        const [rows] = await connection.query(adcSQL)
        tierList['ADC'] = rows;
    }
    catch(err1) {
        console.log(err1)
        con.end()
        return;
    }
    //SPT TIERLIST
    try {
        const [rows] = await connection.query(sptSQL)
        tierList['SPT'] = rows;
        connection.release();
        return tierList
    }
    catch(err1) {
        console.log(err1)
        con.end()
        return;
    }
}

export function getChampName(req, res) {
    const champId = parseInt(req.params.champId)
    const sql = `SELECT champName FROM statDB where champId=${champId} AND region="SG" LIMIT 1`
    const con = mysql.createConnection({
        host: '165.22.223.89',
        user: 'kjaehyeok21',
        password: 'airbusa380861',
        database: 'LOLGRN',
        port: '/var/run/mysqld/mysqld.sock'
    })
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
            con.end()
        }
        else {
            const ang = JSON.parse(JSON.stringify(result))
            console.log(ang)
            res.status(200).send(ang)
            con.end()
        }
    })
}

//Changes nickname with space in between to that complacent to API insertion
export function processNickName(nickname) {
    let newNickName = ""
    for (let i = 0; i < nickname.length; i++) {
        if (nickname[i] != " ") {
            newNickName += nickname[i]
        }
        else {
            newNickName += "%20";
        }
    }
    return newNickName;
}

//Retrieves player ID from Garena Server when given Summoner Name
export function getPlayerAccountId(nickname, regionId, now) {
    if (now)
    {
        return new Promise((resolve, reject) => {
            fetch("https://acs-garena.leagueoflegends.com/v1/players?name=" + nickname.toString() + "&region=" + regionId.toString(), {
                method: 'GET'
            }).then((response) => {
                if (response.status != 200) {
                    reject({'accountId': -1, 'success': false})
                }
                else {
                    response.json().then(json => {
                        resolve({ 'accountId': json['accountId'], 'success': true })
                        return;
                    })
                }
            })
        })
    }
    else {
        return new Promise((resolve, reject) => {
            fetch("http://165.22.223.89:3031/call/playerAccountId/"+nickname.toString()+ "/" + regionId.toString(), {
                method:'GET'
            }).then((response) => {
                if (response.status != 200) {
                    resolve({'accountId': -1, 'success': false})
                }
                response.json().then(json => {
                    resolve({ 'accountId': json['accountId'], 'success': true })
                    return;
                })
            })
        })
    }
    
}
//695511
//Retrieves gameId of last (endIndex - begIndex) games, including the game ID, the player with given ID played.
export function getPlayerHistory(playerId, regionId, begIndex, endIndex, now) {
    if (now) {
        return new Promise((resolve, reject) => {
            fetch("https://acs-garena.leagueoflegends.com/v1/stats/player_history/" + regionId.toString() + "/" + playerId.toString() + "?begIndex=" + begIndex.toString() + "&endIndex=" + endIndex.toString() + "&", {
                method: 'GET'
            }).then((response) => {
                if (response.status != 200) {
                    resolve({ 'content': [], 'success': false })
                    return;
                }
                response.json().then(json => {
                    let tempList = json['games']['games']
                    
                    let finalList = [];
                    for (let i = 0; i < tempList.length; i++) {
                        if (tempList[i]['queueId'] == 420 || tempList[i]['queueId'] == 4) {
                            finalList.push(tempList[i]['gameId'])
                        }
                    }
                    resolve({ 'content': finalList, 'success': true })
                })
            })
        })
    }
    else {
        return new Promise((resolve, reject) => {
            fetch("http://165.22.223.89:3031/call/playerHistory/" + regionId.toString() + "/" + playerId.toString() + "/" + begIndex.toString() + "/" + endIndex.toString(), {
                method: 'GET'
            }).then((response) => {
                if (response.status != 200) {
                    resolve({ 'content': [], 'success': false })
                    return;
                }
                response.json().then(json => {
                    let tempList = json['games']['games']
                    let finalList = [];
                    for (let i = 0; i < tempList.length; i++) {
                        if (tempList[i]['queueId'] == 430/*420*/ || tempList[i]['queueId'] == 4) {
                            finalList.push(tempList[i]['gameId'])
                        }
                    }
                    resolve({ 'content': finalList, 'success': true })
                })
            })
        })
    }
}

//Retrieves detailed information of the game of given ID.
export function getMatchData(matchId, regionId, now) {
    if (now) {
        return new Promise((resolve, reject) => {
            const con = mysql.createConnection({
                host: '165.22.223.89',
                user: 'kjaehyeok21',
                password: 'airbusa380861',
                database: 'LOLGRN',
                port: '/var/run/mysqld/mysqld.sock'
            })
            let sql = 'SELECT patchDate from patchDB'
            let patchDate = -1;
            con.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    resolve({ 'content': [], 'success': false })
                    return;
                    con.end()
                }
                else {
                    let finalResult = JSON.parse(JSON.stringify(result))
                    patchDate = finalResult['patchDate']
                    con.end()
                    fetch("https://acs-garena.leagueoflegends.com/v1/stats/game/" + regionId.toString() + "/" + matchId.toString(), {
                        method: 'GET'
                    }).then(response => {
                        if (response.status != 200) {
                            resolve({ 'content': [], 'success': false })
                            return;
                        }
                        response.json().then(json => {
                            if (json['gameCreation'] < patchDate) {
                                resolve({ 'content' : [], 'success' : false})
                            }
                            resolve({ 'content': json, 'success': true })
                        })
                    })
                }
            })
            
        })
    }
    else {
        return new Promise((resolve, reject) => {
            const con = mysql.createConnection({
                host: '165.22.223.89',
                user: 'kjaehyeok21',
                password: 'airbusa380861',
                database: 'LOLGRN',
                port: '/var/run/mysqld/mysqld.sock'
            })
            let sql = 'SELECT patchDate from patchDB'
            let patchDate = -1;
            con.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    resolve({ 'content': [], 'success': false })
                    return;
                }
                else {
                    let finalResult = JSON.parse(JSON.stringify(result))
                    patchDate = finalResult['patchDate']
                    fetch("http://165.22.223.89:3031/call/matchData/" + regionId.toString() + "/" + matchId.toString(), {
                        method: 'GET'
                    }).then(response => {
                        if (response.status != 200) {
                            resolve({ 'content': [], 'success': false })
                            return;
                        }
                        response.json().then(json => {
                            if (json['gameCreation'] < patchDate) {
                                resolve({ 'content' : [], 'success' : false})
                            }
                            else {
                                resolve({ 'content': json, 'success': true })
                            }
                            
                        })
                    })
                }
            })
            
        })
    }
}

export function getMatchTimeline(matchId, regionId, now) {
    if (now) {
        return new Promise((resolve, reject) => {
            fetch("https://acs-garena.leagueoflegends.com/v1/stats/game/" + regionId.toString() + "/" + matchId.toString() + "/timeline", {
                method: 'GET'
            }).then(response => {
                if (response.status != 200) {
                    resolve({'content': [], 'success': false})
                    return;
                }
                response.json().then(json => {
                    resolve({'content':json, 'success': true})
                })
            })
        })
    }
    else {
        return new Promise((resolve, reject) => {
            fetch("http://165.22.223.89:3031/call/matchTimeline/" + regionId.toString() + "/" + matchId.toString(), {
                method: 'GET'
            }).then(response => {
                if (response.status != 200) {
                    resolve({'content': [], 'success': false})
                    return;
                }
                response.json().then(json => {
                    resolve({'content':json, 'success': true})
                })
            })
        })
    }
}

export async function getOutdatedPlayers(connection) {
    const date = Math.round(Date.now())
    const dateYesterday = date - (60 * 60 * 12 * 1000);
    let sql = 'SELECT id, region FROM userDB WHERE lastUpdated < '+ dateYesterday.toString()
    try {
        const [rows] = await connection.query(sql)
        return {'content': rows, 'success': true}
    } catch (err) {
        console.log(err)
        return {'content': [], 'success': false};
    }
}

export async function checkGameInDB(gameId, connection) {
    let sql = 'SELECT gameId from matchDB where gameId = '+gameId.toString()
    try {
        const [rows] = await connection.query(sql)
        if (rows.length > 0) {
            if (rows[0]['gameId'] == gameId.toString()) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    } catch (err) {
        console.log(err)
        return;
    }
}

export async function deleteOutdatedGames(patchDateTime, connection) {
    let sql = 'SELECT gameId FROM matchDB WHERE gameCreation < ' + patchDateTime.toString()
    console.log("update initiated")
    let gamesForDelete = -1;
    try {
        gamesForDelete = await connection.query(sql)
    }
    catch(err) {
        console.log(err)
        return;
    }
    console.log(gamesForDelete)
    for (let i = 0; i < gamesForDelete.length; i++) {
        console.log(i)
        let matchRecordSQL = 'DELETE FROM matchRecordDB where gameId = '+ gamesForDelete[i]['gameId'].toString()
        try {
            const [rows] = await connection.query(matchRecordSQL)
            console.log(i + 'th record deleted')
        }
        catch(err) {
            console.log(err)
            return;
        }
        let matchSQL = 'DELETE FROM matchDB where gameId = ' + gamesForDelete[i]['gameId'].toString()
        try {
            const [rows] = await connection.query(matchSQL)
            console.log(i + 'th game deleted')
        }
        catch(err) {
            console.log(err)
            return;
        }
    }
    
    let statSQL = 'UPDATE statDB SET winRate = 0, winCount = 0, banRate = 0, banCount = 0, pickRate = 0, pickCount = 0, gScore = 0'

    try {
        const [rows] = await connection.query(statSQL)
        console.log('Stat DB Updated')
    }
    catch(err) {
        console.log(err)
        return
    }

    let patchSQL = `UPDATE patchDB SET patchDate = ${patchDateTime}`
    try {
        const [rows] = await connection.query(patchSQL)
        connection.release()
        console.log('Patch DB Updated')
        return;
    }
    catch(err) {
        console.log(err)
        return
    }
}

export async function updatedPlayer(id, region, connection) {
    let newSQL = `UPDATE userDB SET lastUpdated = ${Date.now() / 1000} WHERE id = ${id} AND region = "${region}"`
    try {
        const [rows] = await connection.query(newSQL)
        return;
    } catch (err) {
        console.log(err)
        return;
    }
}