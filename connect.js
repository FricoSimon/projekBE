const mysql = require('mysql');
const db = mysql.createConnection({
    instanceName: '/cloudsql/latihanfrikogcp:asia-southeast2:frikodb', // your socket connection path
    credentials: '',
    host: '127.0.0.1', // Your ip host
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