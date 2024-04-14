const express = require('express')
const app = express()
const compressionMiddleware = require('./middlewares/compression');

const connect = require('./database/dbConection')

const concesionariaRouter = require('./routes/concesionaria')

app.use(express.json()) 

app.use('/test', (req, res) => {
    res.send("Proyecto Final Backend concesionaria")
})

app.use('/concesionaria', concesionariaRouter)

app.use(compressionMiddleware);

connect()

module.exports = app