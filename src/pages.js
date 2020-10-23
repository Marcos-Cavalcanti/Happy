const Database = require('./database/db')
const saveOrphanage = require('./database/saveOrphanage')

module.exports = {
    index(required, response) {
        return response.render('index')
    },

    readMore(required, response) {
        return response.render('read-more')
    },

    async orphanage(required, response) {

        const id = required.query.id

        try {
            const db = await Database
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`)
            const orphanage = results[0]

            orphanage.images = orphanage.images.split(',')
            orphanage.firstImage = orphanage.images[0]

            if(orphanage.open_on_weekends == "0") {
                orphanage.open_on_weekends = false
            } else {
                orphanage.open_on_weekends 
            }

            return response.render('orphanage', {orphanage})
        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados !')
        }
        return response.render('orphanage')
    },
    
    async orphanages(required, response) {
        try {
            const db = await Database
            const orphanages = await db.all("SELECT * FROM orphanages")
            return response.render('orphanages', {orphanages})
        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados !')
        }
    },

    createOrphanages(required, response) {
        return response.render('create-orphanage')
    },

    async saveOrphanage(require, response) {
        const fields = require.body

        //validar os campos
        if(Object.values(fields).includes('')) {
            return response.send('Todos os campos devem ser preenchidos')
        }

        //salvar um orfanato
        try {
            const db = await Database
            await saveOrphanage(db, {
            lat: fields.lat,
            lng: fields.lng,
            name: fields.name,
            about: fields.about,
            whatsapp: fields.whatsapp,
            images: fields.images.toString(),
            instructions: fields.instructions,
            opening_hours: fields.opening_hours,
            open_on_weekends: fields.open_on_weekends
            })
        //redirecionar
        return response.redirect('./orphanages')

        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados !')
        }
    }
}