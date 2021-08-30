//Server script for live user match record search

import { createRequire } from 'module';

    const require = createRequire(import.meta.url);
const express = require('express');
const bodyParser = require('body-parser')
const app = express();  
const cors=require('cors');
import { processNickName, getPlayerAccountId, getPlayerHistory, getMatchData, checkGameInDB, deleteOutdatedGames, fetchTierList, getChampName } from '../components/calls.js'
import { handleMatchData } from '../components/data.js'
const fetch = require("node-fetch");

const corsOption = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3030'],
    methods: ['GET', 'POST'],
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json());
//app.use(express.urlencoded({extended : true}));

app.options("*", cors(corsOption));

app.listen(3030, () => console.log("Listening on port 3030"));

app.get('/api/deleteOutdatedGames/:patchDateTime', (req, res) => handlePatch(req, res))

app.get('/api/getTierList', (req, res) => getTierList(req, res))

app.post('/api/calculateStats', (req, res) => {
    calculateStats(req, res)
})

app.get('/api/getSummonerRecord/:region/:id', (req, res) => {
    const id = req.params.id;
    const region = req.params.region
    fetch(`https://acs-garena.leagueoflegends.com/v1/stats/player_history/${region}/${id}?begIndex=0&endIndex=20&`, {
        method: 'GET'
    }).then(response => {
        if (response.status == 200) {
            response.json().then(json => {
                res.status(200).send(json)
                let tempList = json['games']['games']
                let finalList = [];
                for (let i = 0; i < tempList.length; i++) {
                    if (tempList[i]['queueId'] == 420 || tempList[i]['queueId'] == 4) {
                        finalList.push(tempList[i]['gameId'])
                    }
                }
                callSchedulerByName(finalList, region)
            })
        }
        else {
            fetch(`https://acs-garena.leagueoflegends.com/v1/stats/player_history/${region.toLowerCase()}/${id}?begIndex=0&endIndex=20&`, {
                method: 'GET'
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(json => {
                        res.status(200).send(json)
                        let tempList = json['games']['games']
                        let finalList = [];
                        for (let i = 0; i < tempList.length; i++) {
                            if (tempList[i]['queueId'] == 420 || tempList[i]['queueId'] == 4) {
                                finalList.push(tempList[i]['gameId'])
                            }
                        }
                        callSchedulerByName(finalList, region)
                    })
                }
                else {
                    res.status(500).send("Failed")
                }
            })
            
        }
    })
})

app.get('/api/getMoreRecord/:region/:id/:startIndex', (req, res) => {
    fetch(`https://acs-garena.leagueoflegends.com/v1/stats/player_history/${req.params.region}/${req.params.id}?begIndex=${req.params.startIndex}&endIndex=${parseInt(req.params.startIndex) + 20}&`, {
        method: "GET"
    }).then(response => {
        if (response.status == 200) {
            response.json().then(json => {
                res.status(200).send(json)
            })
        }
        else if (response.status == 404) {
            res.status(404).send("Not Found")
        }
        else {
            res.status(500).send("Failed")
        }
    })
})

app.get('/api/getSummonerID/:region/:name', (req, res) => {
    console.log(req.params.name)
    fetch(`https://acs-garena.leagueoflegends.com/v1/players?name=${encodeURI(req.params.name)}&region=${encodeURI(req.params.region)}`, {
        method: 'GET'
    }).then(response => {
        if (response.status == 200) {
            response.json().then(json => {
                res.status(200).send(json)
            })
        }
        else {
            console.log(response)
            res.status(500).send("Failed")
        }
    })
})

app.get('/api/getMatch/:region/:matchId', (req, res) => getMatch(req, res))

function getMatch(req, res) {
    fetch(`https://acs-garena.leagueoflegends.com/v1/stats/game/${req.params.region}/${req.params.matchId}`, {
        method: 'GET'
    }).then(response => {
        if (response.status == 200) {
            response.json().then(json => {
                res.status(200).send(json)
            })
        }
        else if (response.status == 429) {
            getMatch(req, res)
        }
        else {
            response.json().then(json => {})
            res.status(500).send("Failed")
        }
    })
}

app.get('/api/getChampName/:champId', (req, res) => {
    getChampName(req, res)
})

async function calculateStats(req, res) {
    const body = req.body.data
    const totGames = body[body.length - 1]
    for (let i = 0; i < body.length - 1; i++) {
        const keys = Object.keys(body[i])
        for (let j = 0; j < keys.length; j++) {
            let winCount = body[i][keys[j]]['winCount'] * 100
            let banCount = body[i][keys[j]]['banCount'] * 100
            let pickCount = body[i][keys[j]]['pickCount'] * 100
            let winRate = winCount / pickCount
            let banRate = banCount / totGames
            let pickRate = pickCount / totGames
            let gScore = winRate * (((-1)/Math.pow((0.09 * pickRate) + 2.087, 2)) + 1.18) * (((-1)/Math.pow((0.2 * banRate) + 4, 2)) + 1.0517)
            body[i][keys[j]]['winRate'] = winRate
            body[i][keys[j]]['banRate'] = banRate
            body[i][keys[j]]['pickRate'] = pickRate
            body[i][keys[j]]['gScore'] = gScore
        }
    }
    res.status(200).send(body)
}

async function getTierList(req, res) {
    const regions = ["SG", "PH", "TH", "TW", "VN"]
    const tierList = await fetchTierList(regions)
    if (Object.keys(tierList).length != 0) {
        res.status(200).send(tierList)    
    }
    else {
        res.status(500).send(false)
    }
}

async function handlePatch(req, res) {
    const deleted = deleteOutdatedGames(req.params.patchDateTime)
    deleted.then((success) => {
        if (success) {
            res.status(200).send(success)
        }
        else {
            res.status(500).send(success)
        }
    })
}

async function callSchedulerByName(gameList, platformId) {
    let rankedList = []
    for (let i = 0; i < gameList.length; i++) {
        let matchCall = await getMatchData(gameList[i], platformId, true);
        if (!matchCall['success']) {
            continue;
        }
        rankedList.push(matchCall["content"])
    }
    let i = 0;
    while (i < rankedList.length)
    {
        let inDB = await checkGameInDB(rankedList[i]['gameId'])
        if (inDB)
        {
            rankedList.splice(i, 1)
        }
        else {
            i++
        }
    }
    handleMatchData(rankedList);
}
