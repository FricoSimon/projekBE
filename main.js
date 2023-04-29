const express = require('express') // import express
const app = express()
const port = 3000 // port number
const bodyParser = require('body-parser') // import body-parser
const db = require(`./connect.js`);
const response = require(`./response.js`);

app.get('/home', (req, res) => { // get method
    db.query('SELECT * FROM mahasiswa', (err, result) => {
        // result from mysql
        response(200, result, 'success', res)
    })
})
// for parsing application/json
app.use(bodyParser.json())
app.get('/', (req, res) => {
    // query string
    res.send(res)
    console.log(req.query)
})
app.post('/login', (req, res) => { // post method
    // body
    console.log(req.body)
    res.send('Hello Login')
})
app.delete('/', (req, res) => { // delete method
    res.send('Hello delete!')
})
app.put('/', (req, res) => { // put method
    res.send('Hello put!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 