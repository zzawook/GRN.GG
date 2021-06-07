import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express=require('express')
const app = express();
import Queue from '../modules/queue.js'
import API from '../components/API.js'

let callScheduler = null; 

app.listen(3031, () => {
    callScheduler = new CallScheduler();
    callScheduler.start()
    console.log("listening at Port 3031")
})

app.get('/api/:address', (req, res) => {
    callScheduler.enqueue(new API(req.params.address , res))
})

class CallScheduler {

    constructor() {
        this.queue = new Queue();
        this.interval = null;
    }

    start() {
        if (this.interval != null) {
            this.interval = setInterval(() => {
                if (!this.queue.isEmpty()) {
                    this.dequeue();
                }
            }, 1000)
        }
        
    }

    enqueue(element) {
        this.queue.enqueue(element)
    }

    dequeue(element) {
        let thisElement = this.queue.dequeue();
        if (thisElement == null) {
            return;
        }
        fetch(thisElement.getAddress(), {
            method: 'GET'
        }).then(response => {
            thisElement.getResponse().status(200).send(response)
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

