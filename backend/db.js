//Allows access to the DB 

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tcg_collection',
    password: 'webdev',
    port: 5432,
});

module.exports = pool;