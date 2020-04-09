const http = require('http')
const { route } = require('./src')

const host = '127.0.0.1'
const port = '3030'

const server = http.createServer((req, res) => {
    route(req.url, res)
})

server.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}`)
})
