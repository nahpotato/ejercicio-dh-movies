const fs = require('fs')
const builder = require('node-html-builder')

let peliculas = JSON.parse(fs.readFileSync('./data/movies.json'))

module.exports = {
    titulo: 'Bienvenidos a DH Movies el mejor sitio para encontrar las ' +
        'películas, incluso mucho mejor que Netflix, Cuevana y PopCorn.',
    total_pelis: peliculas.total_movies,
    pelis: peliculas.movies,
    pie_pagina: 'Recordá que podés visitar las secciones:',
    items_pie_pagina: [
        {
            name: 'En Cartelera',
            link: 'en-cartelera'
        },
        {
            name: 'Más Votadas',
            link: 'mas-votadas'
        },
        {
            name: 'Sucursales',
            link: 'sucursales'
        },
        {
            name: 'Contacto',
            link: 'contacto'
        },
        {
            name: 'Preguntas Frecuentes',
            link: 'preguntas-frecuentes'
        }
    ],
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
        html.content += `<p><b>Total de películas en cartelera:</b> ${this.total_pelis}</p>`
        html.content += `<p><b>Listado de películas:</b></p>`
        this.pelis.sort((a, b) => {
            if (a.title < b.title) {
                return -1
            }
            if (a.title > b.title) {
                return 1
            }
            return 0
        })
        html.content += `<ul>`
        this.pelis.forEach(peli => {
            html.content += `<li>${peli.title}</li>`
        })
        html.content += `</ul>`
        html.content += `<p><b>Recordá que podés visitar las secciones:</b></p>`
        html.content += `<ul>`
        this.items_pie_pagina.forEach(item => {
            html.content += `<li>`
            html.content += `<a href="${item.link}">`
            html.content += `${item.name}</a>`
            html.content += `</li>`
        })
        html.content += `</ul>`
        return builder(html)
    }
}
