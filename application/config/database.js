const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Anmolisonline',
    database: 'photoappDB',
    connectionLimit: 50,
    debug: false,

});

// module.exports = pool;
const promisePool = pool.promise();

module.exports = promisePool;