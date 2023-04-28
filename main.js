const express = require('express') // import express
const app = express()
const port = 3000 // port number
const bodyParser = require('body-parser') // import body-parser

app.use(bodyParser.json()) // for parsing application/json
app.get('/home', (req, res) => { // get method
    console.log(req.query) // query string
    res.send('Hello Home!')
})
app.post('/login', (req, res) => { // post method
    console.log(req.body) // body
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