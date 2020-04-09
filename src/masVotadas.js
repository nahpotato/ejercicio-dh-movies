const fs = require('fs')
const builder = require('node-html-builder')

let peliculas = JSON.parse(fs.readFileSync('./data/movies.json'))

module.exports = {
    titulo: 'Más Votadas.',
    pelis: peliculas.movies,
    load: function () {
        let html = {
            lang: 'es-ar',
            title: this.titulo,
            metas: [
                {
                    name: 'charset',
                    content: 'utf-8'
                }
            ],
            content: ''
        }

        html.content += `<h1>${this.titulo}</h1>`

        this.pelis = this.pelis.filter(peli => {
            return peli.vote_average >= 7
        })

        html.content += `<p><b>Total de peliculas:</b> ${this.pelis.length}</p>`

        let promedio = 0
        this.pelis.forEach(peli => {
            promedio += peli.vote_average
        })
        promedio /= this.pelis.length

        html.content += `<p><b>Rating promedio:</b> ${promedio.toPrecision(3)}</p>`

        html.content += `<p><b>Listado de peliculas</b></p>`

        html.content += `<ul>`
        this.pelis.forEach(peli => {
            html.content += `<li>`

            html.content += `<p><b>${peli.title}</b> <i>${peli.vote_average}</i></p>`
            html.content += `${peli.overview}`

            html.content += `</li>`
        })
        html.content += `</ul>`

        return builder(html)
    }
}
