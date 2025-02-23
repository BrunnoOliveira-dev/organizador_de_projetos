require('dotenv').config()


const app = require('./app')
const http = require('http')

const port = process.env.PORT

app.set('port', port)

const server = http.createServer(app)

server.listen(port)

console.log(`server executando em http://localhost:${port}/`)


