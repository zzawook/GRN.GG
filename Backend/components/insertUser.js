import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { workerData, parentPort } = require('worker_threads')
const mysql = require('mysql')

function handleData() {
    const accountIdList = []
    if (workerData.length == 0) {
        return;
    }
    const regionId = workerData[0]['platformId']
    for (let i = 0; i < workerData.length; i++) {
        for (let j = 0; j < workerData[i]['participants'].length; j++) {
            const participantId = workerData[i]['participants'][j]['participantId']
            for (let k = 0; k < workerData[i]['participantIdentities'].length; k++) {
                if (workerData[i]['participantIdentities'][k]['participantId'] == participantId) {
                    accountIdList.push(workerData[i]['participantIdentities'][k]['player']['accountId'])
                    break;
                }
                if (k + 1 == workerData[i]['participantIdentities'].length) {
                    return false;
                }
            }
        }
    }
    const con = mysql.createConnection({
        host: '165.22.223.89',
        user: 'kjaehyeok21',
        password: 'airbusa380861',
        database: 'LOLGRN',
        port: '/var/run/mysqld/mysqld.sock'
    });
    const ts = Date.now();
    for (let i = 0; i < accountIdList.length; i++) {
        let sql = `INSERT INTO userDB (id, region, registerDate, lastUpdated) VALUES(${accountIdList[i]}, "${regionId}", ${ts}, ${ts}) ON DUPLICATE KEY UPDATE lastUpdated = ${ts}`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (i == accountIdList.length - 1) {
                con.end()
                console.log("Insert user done")
            }
        });
    }
}

handleData()