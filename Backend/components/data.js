import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Worker, isMainThread, workerData } = require('worker_threads')

export function handleMatchData(matchData) {
    runIDHandler(matchData);
    runMatchDataExtractor(matchData)
}


function runMatchDataExtractor(matchData) {
    const worker = new Worker('./insertMatchData.js', { workerData: matchData });
    worker.on('message', (message) => {
        return true
    });
    worker.on('error', (error) => {
        return false;
    });
    worker.on('exit', (code) => {
        if (code !== 0) {
            reject(new Error(`Worker for Match Data stopped with exit code ${code}`))
        }
    })
}

function runIDHandler(matchData) {
    const worker = new Worker('./insertUser.js', { workerData: matchData });
    worker.on('message', (message) => {
        return true
    });
    worker.on('error', (error) => {
        return false;
    });
    worker.on('exit', (code) => {
        if (code !== 0) {
            reject(new Error(`Worker for ID stopped with exit code ${code}`))
        }
    })
}