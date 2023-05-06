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
        if (err) throw err
        response(200, result, 'success', res)
    })
})
// using params id
app.get('/find/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM mahasiswa where id = ${id}`
    db.query(sql, (err, result) => {
        if (err) throw err
        response(200, result, 'success', res)
    })
})
// using query nama
app.get('/find/nama', (req, res) => {
    const nama = req.query.nama
    const sql = `SELECT * FROM mahasiswa where nama = '${nama}'`
    db.query(sql, (err, result) => {
        if (err) throw err
        response(200, result, 'success', res)
    })
})
// test post method
app.post('/login/:id', (req, res) => {
    const id = req.params.id
    res.send(`Id yang diterima adalah ${id}`)
})
// input data into database (mahasiswa)
app.post('/input', (req, res) => {
    const { nim, nama, angkatan, jurusan } = req.body
    const sql = `INSERT INTO mahasiswa (nim, nama, angkatan, jurusan) VALUES (?, ?, ?, ?)`
    const values = [nim, nama, angkatan, jurusan] // prevent sql injection
    db.query(sql, values, (err, result) => {
        if (err) response(500, 'input error', 'failed', res)
        if (result?.affectedRows) response(200, result, 'success', res)
    })
})
// update data into database (mahasiswa)
app.put('/update', (req, res) => {
    const { nim, nama, angkatan, jurusan } = req.body
    const sql = `UPDATE mahasiswa SET nama = ?, angkatan = ?, jurusan = ? WHERE nim = ?`
    const values = [nama, angkatan, jurusan, nim]
    db.query(sql, values, (err, result) => {
        if (err) response(500, 'update error', 'failed', res)
        if (result?.affectedRows) response(200, result, 'success', res)
        else response(404, 'user not found', 'failed', res)
    })
})
// delete data from database (mahasiswa)
app.delete('/delete', (req, res) => {
    const { nim } = req.body
    const sql = `DELETE FROM mahasiswa WHERE nim = ?`
    const values = [nim]
    db.query(sql, values, (err, result) => {
        if (err) response(500, 'delete error', 'failed', res)
        if (result?.affectedRows) response(200, result, 'success', res)
        else response(404, 'user not found', 'failed', res)
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})