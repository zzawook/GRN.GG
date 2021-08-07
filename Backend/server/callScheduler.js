import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fetch = require("node-fetch");
const express=require('express');
const app = express();
import Queue from '../modules/queue.js'
import API from '../components/API.js'

let callScheduler = null; 

app.listen(3031, () => {
    callScheduler = new CallScheduler();
    callScheduler.start()
    console.log("listening at Port 3031")
})

app.get('/call/playerAccountId/:nickname/:regionId', (req, res) => {
    callScheduler.enqueue(new API("https://acs-garena.leagueoflegends.com/v1/players?name=" + req.params.nickname.toString() + "&region=" + req.params.regionId.toString(), res))
})

app.get('/call/playerHistory/:regionId/:playerId/:begIndex/:endIndex', (req, res) => {
    callScheduler.enqueue(new API("https://acs-garena.leagueoflegends.com/v1/stats/player_history/" + req.params.regionId.toString() + "/" + req.params.playerId.toString() + "?begIndex=" + req.params.begIndex.toString() + "&endIndex=" + req.params.endIndex.toString() + "&", res))
})

app.get('/call/matchData/:regionId/:matchId', (req, res) => {
    callScheduler.enqueue(new API("https://acs-garena.leagueoflegends.com/v1/stats/game/" + req.params.regionId.toString() + "/" + req.params.matchId.toString(), res))
})

app.get('/call/matchTimeline/:regionId/:matchId/:accountId', (req, res) => {
    callScheduler.enqueue(new API("https://acs-garena.leagueoflegends.com/v1/stats/game/" + req.params.regionId.toString() + "/" + req.params.matchId.toString() + "/timeline", res))
})

class CallScheduler {

    constructor() {
        this.queue = new Queue();
        this.interval = null;
    }

    start() {
        if (this.interval == null) {
            this.interval = setInterval(() => {
                if (!this.queue.isEmpty()) {
                    this.dequeue();
                }
            }, 5000)
        }
        
    }

    enqueue(element) {
        this.queue.enqueue(element)
    }

    dequeue() {
        let thisElement = this.queue.dequeue();
        if (thisElement == null) {
            return;
        }
        fetch(thisElement.getAddress(), {
            method: 'GET'
        }).then(response => {
            if (response.status == 404) {
                thisElement.getResponse().status(404).send("404 Error; Not found")
            }
            if (response.status == 200) {
                response.json().then(json => {
                    thisElement.getResponse().status(200).send(json);
                })
            }
        })
    }

    stop() {
        if (this.interval != null)
        {
            clearInterval(this.interval);
            this.interval = null;
        }
        
    }
}

