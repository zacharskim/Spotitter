const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser');
const spotTwitterRouter = require('./controllers/spotify_twitter')


app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('build'))

app.use('/', spotTwitterRouter)

module.exports = app