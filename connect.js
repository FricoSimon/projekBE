const mysql = require('mysql');
const db = mysql.createConnection({
    socketPath: '/cloudsql/latihanfrikogcp:asia-southeast2:frikodb', // your socket connection path
    host: '34.101.119.81', // Your ip host
    user: 'root', // Your username
    password: 'friko123', // Your password
    database: 'frikodb' // Your database name
});
if (db === 'authenticated') {
    console.log('Database Connected!');
} else {
    console.log('Database Not Connected!');
}
module.exports = db;