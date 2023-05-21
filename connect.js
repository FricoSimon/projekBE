const mysql = require('mysql');
const db = mysql.createConnection({
    instanceName: 'latihanfrikogcp:asia-southeast2:frikodb', // your socket connection path
    credentials: 'latihanfrikogcp-cfd51cf47126.json',
    host: '34.101.119.81', // Your ip host
    user: 'root', // Your username
    password: 'friko123', // Your password
    database: 'frikodb' // Your database name

});
db.connect((err) => {
    if (err) throw err;
    console.log("Database connected.");
});
module.exports = db;