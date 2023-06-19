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

app.get('/find', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const size = req.query.size || 10;
        const offset = (page - 1) * size;

        const sql = `SELECT * FROM mahasiswa LIMIT ? OFFSET ?`;
        const values = [parseInt(size), parseInt(offset)];
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        responseGet(page, size, 200, 'success', result, res);

    } catch (err) {
        console.error(err.message); // Log the actual error message
        responsePost(500, null, 'Error occurred', res);
    }
});


// using params id
app.get('/find/:id', async (req, res) => {
    try {
        const page = req.query.page || 1
        const size = req.query.size || 10
        const offset = (page - 1) * size

        const id = req.params.id
        const sql = `SELECT * FROM mahasiswa where id = ? limit ? offset ?`
        const values = [parseInt(id), parseInt(size), parseInt(offset)]
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })

        if (result.length === 0) {
            responsePost(404, null, 'User not found', res);
        } else {
            responseGet(page, size, 200, 'success', result, res)
        }

    } catch (err) {
        console.error(err.message);
        responsePost(500, null, 'Error occurred', res);
    }
})

// using query nama
app.get('/find/name/:name', async (req, res) => {
    try {
        const page = req.query.page || 1
        const size = req.query.size || 10
        const offset = (page - 1) * size

        const name = req.params.name
        const sql = `SELECT * FROM mahasiswa where nama = ? limit ? offset ?`;
        const values = [name, parseInt(size), parseInt(offset)]
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })

        if (result.length === 0) {
            responsePost(404, null, 'User not found', res);
        } else {
            responseGet(page, size, 200, 'success', result, res)
        }

    } catch (err) {
        console.error(err.message);
        responsePost(500, null, 'Error occurred', res);
    }
})

// test post method
app.post('/login', async (req, res) => {
    try {
        const { nim, nama } = req.body;
        const sql = `SELECT * FROM mahasiswa WHERE nim = ? AND nama = ?`;
        const values = [nim, nama];
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) reject(err)
                resolve(result)
            });
        })

        if (result.length === 0) {
            responsePost(404, null, 'User not found', res);
        } else {
            responsePost(200, { nim, nama }, 'Login successfully', res);
        }

    } catch (err) {
        console.error(err.message);
        responsePost(500, null, 'Login error', res);
    }
});

// input data into database (mahasiswa)
app.post('/input', async (req, res) => {
    try {
        const { nim, nama, angkatan, jurusan } = req.body;
        const sqlCheck = `SELECT * FROM mahasiswa WHERE nim = ?`;
        const valuesCheck = [nim];

        const existingUser = await new Promise((resolve, reject) => {
            db.query(sqlCheck, valuesCheck, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (existingUser.length > 0) {
            responsePost(409, 'User already exists', 'failed', res);
        } else {
            const sql = `INSERT INTO mahasiswa (nim, nama, angkatan, jurusan) VALUES (?, ?, ?, ?)`;
            const values = [nim, nama, angkatan, jurusan];
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error(err.message);
                    responsePost(500, 'Input error', 'failed', res);
                } else if (result.affectedRows && result.affectedRows > 0) {
                    responsePost(200, { Id: result.insertId, nim, nama, angkatan, jurusan },
                        'Data received successfully', res);
                }
            });
        }

    } catch (err) {
        console.error(err.message);
        responsePost(500, 'Input error', 'failed', res);
    }
});

// update data into database (mahasiswa)
app.put('/update', async (req, res) => {
    try {
        const { nim, nama, angkatan, jurusan } = req.body
        const sql = `UPDATE mahasiswa SET nama = ?, angkatan = ?, jurusan = ? WHERE nim = ?`
        const values = [nama, angkatan, jurusan, nim]
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })

        if (result?.affectedRows) {
            responsePost(200, { changedRows: result.changedRows }, 'updated successfully', res);
        } else {
            responsePost(404, 'user not found', 'failed', res);
        }

    } catch (err) {
        console.error(err.message);
        responsePost(500, 'update error', 'failed', res)
    }
})

// delete data from database (mahasiswa)
app.delete('/delete', async (req, res) => {
    try {
        const { nim } = req.body
        const sql = `DELETE FROM mahasiswa WHERE nim = ?`
        const values = [nim]
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })

        if (result?.affectedRows) {
            responsePost(200, { affectedRows: result.affectedRows }, 'deleted successfully', res)
        } else {
            responsePost(404, 'user not found', 'failed', res)
        }

    } catch (err) {
        console.error(err.message);
        responsePost(500, 'delete error', 'failed', res)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;