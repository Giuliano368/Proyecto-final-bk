const express = require('express')
const app = express()

const connect = require('./database/dbConection')

const concesionariaRouter = require('./routes/concesionaria')

app.use(express.json()) 

app.use('/test', (req, res) => {
    res.send("Proyecto Final Backend concesionaria")
})

app.use('/concesionaria', concesionariaRouter)

connect()

module.exports = app