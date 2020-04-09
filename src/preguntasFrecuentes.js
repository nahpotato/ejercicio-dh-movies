const fs = require('fs')
const builder = require('node-html-builder')

let faqs = JSON.parse(fs.readFileSync('./data/faqs.json'))

module.exports = {
    titulo: 'Preguntas Frecuentes',
    total_preguntas: faqs.total_faqs,
    preguntas: faqs.faqs,
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
        html.content += `<p><b>Total de preguntas:</b> ${this.total_preguntas}</p>`

        html.content += `<ul>`
        this.preguntas.forEach(pregunta => {
            html.content += `<li>`

            html.content += `<p><b>${pregunta.faq_title}</b></p>`
            html.content += `${pregunta.faq_answer}`

            html.content += `</li>`
        })
        html.content += `</ul>`

        return builder(html)
    }
}
