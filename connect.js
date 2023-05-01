const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost', // Your host
    user: 'root', // Your username
    password: '', // Your password
    database: 'universitas' // Your database name
});

module.exports = db;