const fs = require('fs')
const builder = require('node-html-builder')

let theaters = JSON.parse(fs.readFileSync('./data/theaters.json'))

module.exports = {
    titulo: 'Nuestras Salas',
    total_salas: theaters.total_theaters,
    salas: theaters.theaters,
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
        html.content += `<p><b>Total de salas: </b>${this.total_salas}</p>`

        html.content += `<ul>`
        this.salas.forEach(sala => {
            html.content += `<li>`

            html.content += `<p><b>${sala.name}</b></p>`
            html.content += `<i>Dirección: </i>${sala.address}<br>`
            html.content += `${sala.description}`

            html.content += `</li>`
        })
        html.content += `</ul>`

        return builder(html)
    }
}
