const mysql = require('mysql');
const db = mysql.createConnection({
    //instanceName: 'latihanfrikogcp:asia-southeast2:frikodb', // your socket connection path
    //credentials: 'latihanfrikogcp-cfd51cf47126.json',
    host: 'https://friko123.000webhostapp.com/', // Your ip host
    user: 'friko', // Your username
    password: 'FrikO@123', // Your password
    database: 'id20925580_universitas' // Your database name

});
db.connect((err) => {
    if (err) throw err;
    console.log("Database connected.");
});
module.exports = db;
