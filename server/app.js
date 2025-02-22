const express = require('express')
const path = require('path')

const app = express()
const router = require('./routes/routes')


app.set('views', path.join(__dirname, '../client/views/'))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, '../client/public')))



app.use(express.json())

app.use(router)


module.exports = app