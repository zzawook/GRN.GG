const { workerData, parentPort}=require('worker_threads')

function handleData() {
    const accountIdList=[]
    const matchData = workerData;
    for (let i = 0; i < matchData.length; i++) {
        for (let j = 0; j < matchData[i]['participants'].length; j++) {
            const participantId = matchData[i]['participants'][j]['participantId']
            for (let k = 0; k < matchData[i]['participantIdentities'].length; k++) {
                if (matchData[i]['participantIdentities'][k]['participantId'] == participantId) {
                    accountIdList.push(matchData[i]['participantIdentities'][k]['player']['accountId'])
                    break;
                }
                if (k + 1 == matchData[i]['participantIdentities'].length) {
                    return false;
                }
            }
        }
    }
    const con = mysql.createConnection({
        host: 'aiscstudents.com',
        user: 'aiscstudentsClient',
        password: 'airbusa3501000',
        database: 'aiscstudents',
    });
    const ts = Date.now();
    con.connect(function (err) {
        if (err) {
            throw err;
        }
        console.log("Connected HAHA")
    });
    for (let i = 0; i < accountIdList.length; i++) {
        let sql = `INSERT INTO userDB (id, lastCheck) VALUES(${accountIdList[i]}, ${ts}) ON DUPLICATE KEY UPDATE id = ${accountIdList[i]}, lastCheck = ${ts})`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
        });
    }
    parentPort.postMessage("Success")
}

handleData()