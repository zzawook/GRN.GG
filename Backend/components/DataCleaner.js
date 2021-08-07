import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fetch = require("node-fetch")
const mysql = require('mysql')

DeleteOutdatedGames(7, 30, 2021, 23, 59)

async function DeleteOutdatedGames(patchMonth, patchDay, patchYear, patchHour, patchMinute) {
    const patchDateTime = Date.UTC(patchYear, patchMonth, patchDay, patchHour, patchMinute, 0) / 1000;
    console.log(patchDateTime)
    fetch("https://grn.gg/api/deleteOutdatedGames/"+patchDateTime.toString(), {
        method: 'GET'
    }).then(response => {
        if (response.status != 200) {
            console.log(response)
        }
        else {
            console.log(response.body)
        }
    })
}