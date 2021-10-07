import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mysql2 = require('mysql2/promise');

const fetch = require("node-fetch")
const mysql = require('mysql')

let version = '11.10.1';
let items = {};
let champions = {};

const VERSIONS = "https://ddragon.leagueoflegends.com/api/versions.json"
const ITEMS = "http://ddragon.leagueoflegends.com/cdn/"+ version +"/data/en_US/item.json";
const CHAMPIONS = "http://ddragon.leagueoflegends.com/cdn/"+ version +"/data/en_US/champion.json"

function setup() {
    fetch(VERSIONS).then(response => {
        if (response.status === 200) {
            respose.json().then(json => {
                version = json[0];
            })
        }
    })
    fetch(ITEMS).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                items = json['data'];
            })
        }
    })
    fetch(CHAMPIONS).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                champions = json['data'];
            })
        }
    })
}

let con = mysql2.createPool({
    host: '165.22.223',
    user: 'kjaehyeok21',
    password: 'airbusa380861',
    database: 'LOLGRN',
    port: '/var/run/mysqld/mysqld.sock'
});

const connection = await con.getConnection(async conn => conn);
const colNames = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'ward']
const champList = Object.keys(champions);

for (let a = 0; a < champList.length; a++) {
    const itemList = [];
    for (let i = 0; i < colNames.length; i++) {
        let sql = 'SELECT' + colNames[i] + 'FROM matchRecordDB WHERE champId=?'
        let rows = [];
        let fields = [];
        try {
            [rows, fields] = await connection.query(sql);
        }
        catch(err1) {
            console.log(err1);
        }
        console.log(rows, fields);
    }
}



