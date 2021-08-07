import { getPlayerHistory, getMatchData, getOutdatedPlayers, checkGameInDB, updatedPlayer } from '../components/calls.js'
import { handleMatchData } from '../components/data.js'

async function findMoreData() {
    let gameList = [];
    let rankedList = [];

    //fetch 15 players that are not updated since [1 day] in the order of last update date
    let outdatedPlayersCall = await getOutdatedPlayers();
    if (!outdatedPlayersCall['success']) {
        return false;
    }
    let outdatedPlayers = outdatedPlayersCall['content'];
    console.log('Outdated Players length: ' + outdatedPlayers.length.toString())
    let playerLength = 0;
    if (outdatedPlayers.length > 5000) {
        playerLength = 5000;
        outdatedPlayers.splice(playerLength, outdatedPlayers.length - playerLength)
        console.log('Reset Players length: ' + outdatedPlayers.length.toString())
    }
    else {
        playerLength = outdatedPlayers.length;
    }
    let count = 0;
    //for each player, fetch 20 recent match data
    for (let i = 0; i < playerLength; i++) {
        if (count < 9000) {
            console.log(i.toString() + "th player")
            let historyCall = await getPlayerHistory(outdatedPlayers[i]['id'], outdatedPlayers[i]['region'], 0, 20, true);
            if (!historyCall['success']) {
                continue;
            }
            let tempGameList = historyCall['content']
            for (let j = 0; j < tempGameList.length; j++)
            {
                let inDB = await checkGameInDB(tempGameList[j]);
                if (!inDB) {
                    gameList.push( {'id': tempGameList[j], 'region': outdatedPlayers[i]['region']} )
                    count = count + 1;
                }
            }
            updatedPlayer(outdatedPlayers[i]['id'], outdatedPlayers[i]['region'])
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
    handleMatchData(rankedList)
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