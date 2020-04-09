const fs = require('fs')
const builder = require('node-html-builder')

let peliculas = JSON.parse(fs.readFileSync('./data/movies.json'))

module.exports = {
    titulo: 'En Cartelera.',
    total_pelis: peliculas.total_movies,
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
        html.content += `<p><b>Total de películas:</b> ${this.total_pelis}</p>`
        html.content += `<p><b>Listado de películas</b></p>`

        html.content += `<ul>`
        this.pelis.forEach(peli => {
            html.content += `<li>`

            html.content += `<p><b>${peli.title}</b></p>`
            html.content += `${peli.overview}`

            html.content += `</li>`
        })
        html.content += `</ul>`

        return builder(html)
    }
}
