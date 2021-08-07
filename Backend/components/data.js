import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Worker, isMainThread, workerData } = require('worker_threads')

export function handleMatchData(matchData) {
    runIDHandler(matchData);
    runMatchDataExtractor(matchData)
}


function runMatchDataExtractor(matchData) {
    const worker = new Worker('/home/kjaehyeok21/Backend/components/insertMatchData.js', { workerData: matchData });
    worker.on('message', (message) => {
        console.log(message)
        return true
    });
    worker.on('error', (error) => {
        console.log(error)
        return false;
    });
    worker.on('exit', (code) => {
        if (code !== 0) {
            return(new Error(`Worker for Match Data stopped with exit code ${code}`))
        }
    })
}

function runIDHandler(matchData) {
    const worker = new Worker('/home/kjaehyeok21/Backend/components/insertUser.js', { workerData: matchData });
    worker.on('message', (message) => {
        console.log(message)
        return true
    });
    worker.on('error', (error) => {
        console.log(error)
        return false;
    });
    worker.on('exit', (code) => {
        if (code !== 0) {
            return(new Error(`Worker for ID stopped with exit code ${code}`))
        }
    })
}