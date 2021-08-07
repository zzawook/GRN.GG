import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fetch = require("node-fetch");
const mysql = require('mysql')

export function fetchTierList(regions) {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: '165.22.223.89',
            user: 'kjaehyeok21',
            password: 'airbusa380861',
            database: 'LOLGRN',
            port: '/var/run/mysqld/mysqld.sock'
        })
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
            con.query(regionSQL, (err, result) => {
                if (err) {
                    console.log(err)
                    con.end()
                    return;
                }
                result = JSON.parse(JSON.stringify(result))
                tierList['COUNT'][regions[i].toString()] = result[0]['count']
            })
        }
        const versionSQL = 'SELECT patchVersion from patchDB'
        con.query(versionSQL, (err, result) => {
            if (err) {
                console.log(err)
                con.end()
                return;
            }
            result = JSON.parse(JSON.stringify(result))
            tierList['version'] = result[0]['patchVersion']
        })
        const topPromise = new Promise((resolve1, reject1) => {
            con.query(topSQL, (err, result)=> {
                if (err) {
                    console.log(err)
                    con.end()
                    reject1(false)
                    return;
                }
                else {
                    let ang = JSON.parse(JSON.stringify(result))
                    tierList['TOP'] = ang;
                    resolve1(true)
                }
            })
        })
        const jglPromise = new Promise((resolve1, reject1) => {
            con.query(jglSQL, (err, result)=> {
                if (err) {
                    console.log(err)
                    con.end()
                    reject1(false)
                    return;
                }
                else {
                    let ang = JSON.parse(JSON.stringify(result))
                    tierList['JGL'] = ang;
                    resolve1(true)
                }
            })
        })
        const midPromise = new Promise((resolve1, reject1) => {
            con.query(midSQL, (err, result)=> {
                if (err) {
                    console.log(err)
                    con.end()
                    reject1(false)
                    return;
                }
                else {
                    let ang = JSON.parse(JSON.stringify(result))
                    tierList['MID'] = ang;
                    resolve1(true)
                }
            })
        })
        const adcPromise = new Promise((resolve1, reject1) => {
            con.query(adcSQL, (err, result)=> {
                if (err) {
                    console.log(err)
                    con.end()
                    reject1(false)
                    return;
                }
                else {
                    let ang = JSON.parse(JSON.stringify(result))
                    tierList['ADC'] = ang;
                    resolve1(true)
                }
            })
        })
        const sptPromise = new Promise((resolve1, reject1) => {
            con.query(sptSQL, (err, result)=> {
                if (err) {
                    console.log(err)
                    con.end()
                    reject1(false)
                    return;
                }
                else {
                    let ang = JSON.parse(JSON.stringify(result))
                    tierList['SPT'] = ang;
                    resolve1(true)
                }
            })
        })
        Promise.all([topPromise, jglPromise, midPromise, adcPromise, sptPromise]).then((result) => {
            let rejected = false;
            for (let a = 0; a < result.length; a++) {
                if (result[a] == false) {
                    rejected = true;
                }
            }
            if (!rejected) {
                resolve(tierList);
            }
            else {
                resolve({});
            }
        })
    })
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

export function getOutdatedPlayers() {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: '165.22.223.89',
            user: 'kjaehyeok21',
            password: 'airbusa380861',
            database: 'LOLGRN',
            port: '/var/run/mysqld/mysqld.sock'
        })
        const date = Math.round(Date.now())
        const dateYesterday = date - (60 * 60 * 12 * 1000);
        let sql = 'SELECT id, region FROM userDB WHERE lastUpdated < '+ dateYesterday.toString()
        con.query(sql, (err, result)=> {
            if (err) {
                console.log(err)
                con.end()
                resolve({ 'content': [], 'success': false });
                return;
            }
            else {
                let ang = JSON.parse(JSON.stringify(result))
                resolve({'content': ang, 'success': true})
            }
            
        })
    })
}

export function checkGameInDB(gameId) {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: '165.22.223.89',
            user: 'kjaehyeok21',
            password: 'airbusa380861',
            database: 'LOLGRN',
            port: '/var/run/mysqld/mysqld.sock'
        })
        let sql = 'SELECT gameId from matchDB where gameId = '+gameId.toString()
        con.query(sql, (err, result)=> {
            if (err) {
                console.log(err)
                con.end()
                reject();
                return;
            }
            else {
                con.end()
                if (result.length > 0) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            }
        })
    })
}

export function deleteOutdatedGames(patchDateTime) {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: '165.22.223.89',
            user: 'kjaehyeok21',
            password: 'airbusa380861',
            database: 'LOLGRN',
            port: '/var/run/mysqld/mysqld.sock'
        })
        let sql = 'SELECT gameId FROM matchDB WHERE gameCreation < ' + patchDateTime.toString()
        console.log("update initiated")
        con.query(sql, (err, result)=> {
            if (err) {
                console.log(err)
                con.end()
                resolve(err)
                return;
            }
            let gamesForDelete = JSON.parse(JSON.stringify(result));
            const unit = 1000;
            let done = true;
            if (gamesForDelete.length > unit) {
                done = false;
                gamesForDelete.splice(unit, gamesForDelete.length - 1);
            }
            console.log(gamesForDelete)
            const promiseList = [];
            for (let i = 0; i < gamesForDelete.length; i++) {
                let matchRecordSQL = 'DELETE FROM matchRecordDB where gameId = '+ gamesForDelete[i]['gameId'].toString()
                promiseList.push(new Promise((resolve1, reject1) => {
                    console.log(i)
                    con.query(matchRecordSQL, (err, result) => {
                        if (err) {
                            console.log(err)
                            resolve1(false)
                            return;
                        }
                        else {
                            console.log(i + 'th record deleted')
                            let matchSQL = 'DELETE FROM matchDB where gameId = ' + gamesForDelete[i]['gameId'].toString()
                            con.query(matchSQL, (err, result) => {
                                if (err) {
                                    console.log(err)
                                    resolve1(false)
                                    return;
                                }
                                else {
                                    console.log(i + "th game deleted")
                                    resolve1(true)
                                }
                            })
                        }
                    })
                }))
            }
            Promise.all(promiseList).then(values => {
                let statSQL = 'UPDATE statDB SET winRate = 0, winCount = 0, banRate = 0, banCount = 0, pickRate = 0, pickCount = 0, gScore = 0'
                con.query(statSQL, (err, result) => {
                    if (err) {
                        console.log(err)
                        resolve(err)
                        return;
                    }
                    else {
                        let patchSQL = `UPDATE patchDB SET patchDate = ${patchDateTime}`
                        con.query(patchSQL, (err, result) => {
                            if (err) {
                                console.log(err)
                                resolve(err)
                                return;
                            }
                            else {
                                resolve(true);
                                if (!done) {
                                    deleteOutdatedGames().then((value) => {})
                                }
                            }
                        })
                    }
                })
            })
        })
    })
}

export function updatedPlayer(id, region) {
    let newSQL = `UPDATE userDB SET lastUpdated = ${Date.now() / 1000} WHERE id = ${id} AND region = "${region}"`
    const con = mysql.createConnection({
        host: '165.22.223.89',
        user: 'kjaehyeok21',
        password: 'airbusa380861',
        database: 'LOLGRN',
        port: '/var/run/mysqld/mysqld.sock'
    })
    con.query(newSQL, (err, result) => {
        if (err) {
            console.log(err)
            con.end()
            return
        }
        con.end()
    })
}