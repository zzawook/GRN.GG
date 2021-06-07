import { getPlayerHistory, getMatchData, getOutdatedPlayers, checkGameInDB } from '../components/calls.js'
import { handleMatchData } from '../components/data.js'
import Queue from './queue.js'

export default class IDFinder {

    constructor() {
        setInterval(findMoreData(), 1000 * 60 * 60);
    }

    findMoreData = async function () {
        let platformId = "SG";
        let gameList = [];
        let rankedList = [];

        //fetch 15 players that are not updated since [1 day] in the order of last update date
        let outdatedPlayersCall = await getOutdatedPlayers();
        let outdatedPlayers = outdatedPlayersCall['content'];
        if (outdatedPlayersCall['success']) {
            return false;
        }

        //for each player, fetch 20 recent match data
        for (let i = 0; i < outdatedPlayers.length; i++) {
            let historyCall = await getPlayerHistory(outdatedPlayers[i]['accountId'], outdatedPlayers[i]['platformId'], 0, 20);
            let tempGameList = historyCall['content']
            for (let j = 0; j < historyCall.length; j++)
            {
                let checkGameInDB = await checkGameInDB(historyCall[i]);
                if (checkGameInDB) {
                    tempGameList.splice(i, 1);
                }
            }
            for (let j = 0; j < tempGameList.length; j++) {
                gameList.push(tempGameList[i])
            }
            if (!historyCall['success']) {
                return false;
            }
        }

        //for each match, get match data
        for (let i = 0; i < gameList.length; i++) {
            let matchCall = getMatchData(gameList[i], platformId, accountId);
            rankedList.push(matchCall["content"])
            if (!matchCall['success']) {
                return false;
            }
        }

        handleMatchData(rankedList)
    }
}

const idScheduler = new IDFinder();