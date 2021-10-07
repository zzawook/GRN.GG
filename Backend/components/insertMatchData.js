import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { workerData, parentPort } = require('worker_threads')
const mysql = require('mysql')
const mysql2 = require('mysql2/promise')

export default async function handleData() {
    
}

handleData();