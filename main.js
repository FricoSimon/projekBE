const express = require('express') // import express
const app = express() // create express app
const port = 3000 // port number
const bodyParser = require('body-parser') // import body-parser
const db = require(`./connect.js`);
const response = require(`./response.js`);

// for parsing application/json
app.use(bodyParser.json())
app.get('/find', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa'
    db.query(sql, (err, result) => {
        response(200, result, 'success', res)
    })
})
// using params id
app.get('/find/id/:id', (req, res) => {
    const sql = `SELECT * FROM mahasiswa where id = ${req.params.id}`
    db.query(sql, (err, result) => {
        response(200, result, 'success', res)
    })
})
// using query nama
app.get('/find/nama', (req, res) => {
    const sql = `SELECT * FROM mahasiswa where nama = '${req.query.nama}'`
    db.query(sql, (err, result) => {
        response(200, result, 'success', res)
    })
})
app.post('/login/id/:id', (req, res) => {
    const id = req.params.id
    res.send(`Id yang diterima adalah ${id}`)
})
app.delete('/', (req, res) => {
    res.send('Hello delete!')
})
app.put('/', (req, res) => {
    res.send('Hello put!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 