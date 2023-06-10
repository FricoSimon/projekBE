const express = require('express') // import express
const app = express() // create express app
const port = 3000 // port number
const bodyParser = require('body-parser') // import body-parser
const rateLimit = require('express-rate-limit') // import rate limiter
const db = require(`./connect.js`);
const { responseGet, responsePost } = require(`./response.js`);

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10 // limit each IP to 10 requests per windowMs
})

app.use(bodyParser.json()) // for parsing application/json
app.use(limiter) // apply rate limiter to all requests

app.get('/find', (req, res) => {
    const page = req.query.page || 1
    const size = req.query.size || 10
    const offset = (page - 1) * size

    const sql = `SELECT * FROM mahasiswa limit ? offset ?`
    const values = [parseInt(size), parseInt(offset)]
    db.query(sql, values, (err, result) => {
        if (err) responsePost(500, null, 'Login error', res);
        responseGet(page, size, 200, 'success', result, res)
    })
})

// using params id
app.get('/find/:id', (req, res) => {
    const page = req.query.page || 1
    const size = req.query.size || 10
    const offset = (page - 1) * size

    const id = req.params.id
    const sql = `SELECT * FROM mahasiswa where id = ? limit ? offset ?`
    const values = [parseInt(id), parseInt(size), parseInt(offset)]
    db.query(sql, values, (err, result) => {
        if (err) responsePost(500, null, 'Login error', res);
        responseGet(page, size, 200, 'success', result, res)
    })
})

// using query nama
app.get('/find/name/:name', (req, res) => {
    const page = req.query.page || 1
    const size = req.query.size || 10
    const offset = (page - 1) * size

    const name = req.params.name
    const sql = `SELECT * FROM mahasiswa where nama = ? limit ? offset ?`;
    const values = [name, parseInt(size), parseInt(offset)]
    db.query(sql, values, (err, result) => {
        if (err) responsePost(500, null, 'Login error', res);
        responseGet(page, size, 200, 'success', result, res)
    })
})

// test post method
app.post('/login', (req, res) => {
    const { nim, nama } = req.body;
    const sql = `SELECT * FROM mahasiswa WHERE nim = ? AND nama = ?`;
    const values = [nim, nama];

    db.query(sql, values, (err, rows) => {
        if (err)
            responsePost(500, null, 'Login error', res);

        if (rows.length === 0) {
            responsePost(404, null, 'User not found', res);
        } else {
            responsePost(200, { nim, nama }, 'Login successfully', res);
        }
    });
});

// input data into database (mahasiswa)
app.post('/input', (req, res) => {
    const { nim, nama, angkatan, jurusan } = req.body
    const sqlCheck = `SELECT * FROM mahasiswa WHERE nim = ?`
    const valuesCheck = [nim]
    db.query(sqlCheck, valuesCheck, (err, result) => {
        if (err) {
            responsePost(500, 'input error', 'failed', res)
            return
        }
        if (result?.length) {
            responsePost(409, 'user already exist', 'failed', res)
            return
        }

        const sql = `INSERT INTO mahasiswa (nim, nama, angkatan, jurusan) VALUES (?, ?, ?, ?)`
        const values = [nim, nama, angkatan, jurusan] // prevent sql injection
        db.query(sql, values, (err, result) => {
            if (err) responsePost(500, 'input error', 'failed', res)
            if (result?.affectedRows && result?.affectedRows > 0) responsePost(200,
                { Id: result.insertId, nim, nama, angkatan, jurusan }, `Data received successfully`, res)
        })

    })
})

// update data into database (mahasiswa)
app.put('/update', (req, res) => {
    const { nim, nama, angkatan, jurusan } = req.body
    const sql = `UPDATE mahasiswa SET nama = ?, angkatan = ?, jurusan = ? WHERE nim = ?`
    const values = [nama, angkatan, jurusan, nim]
    db.query(sql, values, (err, result) => {
        if (err) responsePost(500, 'update error', 'failed', res)
        if (result?.affectedRows) responsePost(200, { changedRows: result.changedRows }, 'updated successfully', res)
        else responsePost(404, 'user not found', 'failed', res)
    })
})

// delete data from database (mahasiswa)
app.delete('/delete', (req, res) => {
    const { nim } = req.body
    const sql = `DELETE FROM mahasiswa WHERE nim = ?`
    const values = [nim]
    db.query(sql, values, (err, result) => {
        if (err) responsePost(500, 'delete error', 'failed', res)
        if (result?.affectedRows) responsePost(200, { affectedRows: result.affectedRows }, 'deleted successfully', res)
        else responsePost(404, 'user not found', 'failed', res)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})