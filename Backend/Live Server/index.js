//Server script for live user match record search

import { createRequire } from 'module';

const express = require('express')
const app = express();
const cors=require('cors')
import { processNickName, getPlayerAccountId, getPlayerHistory, getMatchData, checkGameInDB } from '../components/calls.js'
import { handleMatchData } from '../components/data.js'


const corsOption = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3030', 'http://aiscstudents.com', 'http://aiscstudents.com/login', 'https://aiscstudents.com', 'https://aiscstudents.com/login'],
    methods: ['GET', 'POST'],
    credentials: true,
}

app.use(cors(corsOption));
app.options("*", cors(corsOption));

app.listen(3030, () => console.log("Listening on port 3030"));

app.get('/api/searchName/:platformId/:nickname', callSchedulerByName(req, res))

async function callSchedulerByName(req, res) {  
    let platformId = "SG"//req.params.platformId;
    let accountId = -1;
    let gameList = [];
    let rankedList = [];
    let nickname = ""

    nickname = processNickName("Debugging Nerd"/*req.params.id*/);
    let accountIdCall = await getPlayerAccountId(nickname, platformId);
    accountId = accountIdCall['accountId']
    if (!accountIdCall['success']) {
        return false;
    }

    let historyCall = await getPlayerHistory(accountId, platformId, 0, 20);
    gameList = historyCall['content']
    if (!historyCall['success']) {
        return false;
    }

    for (let i = 0; i < gameList.length; i++) {
        let matchCall = await getMatchData(gameList[i], platformId, accountId);
        if (!matchCall['success']) {
            return false;
        }
        rankedList.push(matchCall["content"])
    }
    res.status(200).send(rankedList)
    for (let i = 0; i < rankedList.length; i++)
    {
        let inDB = checkGameInDB(rankedList[i]['gameId'])
        if (inDB)
        {
            rankedList.splice(i, 1)
        }
    }
    handleMatchData(rankedList);
}

async function callSchedulerById(accountId) {
    let platformId = "SG";
    let gameList = [];
    let rankedList = [];
    let nickname = ""

    let historyCall = getPlayerHistory(accountId, platformId, 0, 15);
    gameList = historyCall['content']
    if (!historyCall['success']) {
        return false;
    }

    for (let i = 0; i < gameList.length; i++) {
        let matchCall = getMatchData(gameList[i], platformId, accountId);
        rankedList.push(matchCall["content"])
        if (!matchCall['success']) {
            return false;
        }
    }
    console.log(matchCall['content'])
    handleMatchData(rankedList);
}