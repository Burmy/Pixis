const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'loclahost',
    user: 'photoapp',
    password: '',
    database: '',
    //debug: true,

});

const promisePool = pool.promise();

module.exports = promisePool;