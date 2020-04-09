const { home, enCartelera, masVotadas, sucursales, contacto, preguntasFrecuentes } = require('.')

module.exports = (url, res) => {
    if (typeof (url) != 'string') {
        process.stderr.write(`url expected to be string and got ${typeof (url)}\n`)
        process.exit(1)
    }

    res.writeHead(200, 'Content-Type', 'text/plain; charset=utf-8')

    switch (url) {
        case '/':
            res.end(home.load())
            break
        case '/en-cartelera':
            res.end(enCartelera.load())
            break
        case '/mas-votadas':
            res.end(masVotadas.load())
            break
        case '/sucursales':
            res.end(sucursales.load())
            break
        case '/contacto':
            res.end(contacto.load())
            break
        case '/preguntas-frecuentes':
            res.end(preguntasFrecuentes.load())
            break
        default:
            res.writeHead(404, 'Content-Type', 'text/plain')
            res.end('404 not found')
    }
}
