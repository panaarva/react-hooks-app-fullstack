const {Pool} = require('pg');
exports.pool = new Pool({
    user: 'database-userName',
    host: '127.0.0.1',
    database: 'database-name',
    password: 'database-password',
    port: 5432
});