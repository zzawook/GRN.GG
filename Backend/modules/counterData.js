import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mysql2 = require('mysql2/promise');