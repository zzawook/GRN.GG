import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const mysql=require('mysql')

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
export function getPlayerAccountId(nickname, regionId) {
    return new Promise((resolve, reject) => {
        fetch("localhost:3031/api/https://acs-garena.leagueoflegends.com/v1/players?name=" + nickname.toString() + "&region=" + regionId.toString(), {
            method:'GET'
        }).then((response) => {
            if (response.status != 200) {
                reject([-1, false])
            }
            response.json().then(json => {
                resolve({ 'accountId': json['accountId'], 'success': true })
            })
        })
    })
}

//Retrieves gameId of last (endIndex - begIndex) games, including the game ID, the player with given ID played.
export function getPlayerHistory(playerId, regionId, begIndex, endIndex) {
    return new Promise((resolve, reject) => {
        fetch("localhost:3031/api/https://acs-garena.leagueoflegends.com/v1/stats/player_history/" + regionId.toString() + "/" + playerId.toString() + "?begIndex=" + begIndex.toString() + "&endIndex=" + endIndex.toString() + "&", {
            method: 'GET'
        }).then((response) => {
            if (response.status != 200) {
                reject({ 'content': [], 'success': false })
            }
            response.json().then(json => {
                let tempList = json['games']['games']
                let finalList = [];
                for (let i = 0; i < tempList['games']['games']['gameId'].length; i++) {
                    if (tempList[i]['queueId'] == 430) {
                        finalList.push(tempList['games']['games']['gameId']['gameId'])
                    }
                }
                resolve({ 'content': finalList, 'success': true })
            })
        })
    })
}

//Retrieves detailed information of the game of given ID.
export function getMatchData(matchId, regionId, accountId) {
    return new Promise((resolve, reject) => {
        fetch("localhost:3031/api/https://acs-garena.leagueoflegends.com/v1/stats/game/" + regionId.toString() + "/" + matchId.toString() + "?visiblePlatformId=" + regionId.toString() + "&visibleAccountId=" + accountId.toString(), {
            method: 'GET'
        }).then(response => {
            if (response.status != 200) {
                reject({ 'content': [], 'success': false })
            }
            response.json().then(json => {
                resolve({ 'content': json, 'success': true })
            })
        })
    })
}

export function getOutdatedPlayers() {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: '165.22.223.89',
            user: 'kjaehyeok21',
            password: 'airbusa380861',
            database: 'LOLGRN'
        })
        const date = Date.now()
        const dateYesterday = date - (1000 * 60 * 60 * 24);
        let sql = 'SELECT * from userDB where lastUpdated < '+ dateYesterday.toString()
        con.query(sql, (err, result)=> {
            if (err) {
                console.log(err)
                con.end()
                reject();
            }
            else {
                console.log(result)
                resolve(result)
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
            database: 'LOLGRN'
        })
        let sql = 'SELECT gameId from matchRecordDB where gameId = '+gameId.toString()
        con.query(sql, (err, result)=> {
            if (err) {
                console.log(err)
                con.end()
                reject();
            }
            else {
                if (result.length > 0) {
                    resolve(true)
                }
                resolve(false)
            }
        })
    })
}