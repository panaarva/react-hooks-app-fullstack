const {Pool} = require('pg');
exports.pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'project',
    password: 'kn0wled9e',
    port: 5432
});
exports.privateKey = `kn0wled9e#1998`;