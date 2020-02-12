module.exports = {
    create: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {name, description, price, image_url} = req.body
        dbInstance.create_product([ name, description, price, image_url])
        .then( () => res.sendStatus(200) )
        .catch( err => {
            res.status(500).send({errorMessage: "Sorry, this whole create thing isn't working out. Try again later"})
            console.log(err)
        })
    },

    getOne: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params
        dbInstance.read_product(id)
        .then( product => res.sendStatus(200).send(product) )
        .catch( err => {
            res.status(500).send({errorMessage: "Dammit, we couldn't get that one. Better luck next time."})
            console.log(err)
        })
    },

    getAll: (req, res, next) => {
        const dbInstance = req.app.get('db')
        dbInstance.read_products()
        .then( products => res.status(200).send(products) )
        .catch( err => {
            res.status(500).send({errorMessage: "Well hell, that's embarrassing. Try to get them all later."})
            console.log(err)
        })
    },

    update: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {params, query} = req
        dbInstance.update_products([params.id, query.desc])
        .then( () => res.sendStatus(200) )
        .catch( err => {
            res.status(500).send({errorMessage: "You trying to update? Naw, man, that's not gonna work out right now. "})
            console.log(err)
        })
    },

    delete: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params
        dbInstance.delete_product(id)
        .then( () => res.sendStatus(200) )
        .catch( err => {
            res.status(500).send({errorMessage: "You're not authorized for that deletion! Go on, git!"})
            console.log(err)
        })
     },
}