const router = require('express').Router()
const Product = require("../models/products.model")
const User = require("../models/User.model")

router.get("/todoslosproductos", (req, res) => {
    Product.find()
        .then(productos => {
            res.json({ productos, holi: true })
        })
        .catch(console.log)
})

//Videogame.findByIdAndUpdate(videogameRef, { $push: { postRef: newPost._id } });


router.post("/nuevo", (req, res) => {
    Product.create(req.body)
        .then(nuevoProducto => {
            return nuevoProducto
        })
        .then(nuevoProducto => {
            return User.findByIdAndUpdate(req.body.idDelUsuario, { $push: { products: nuevoProducto._id } })
        })
        .then(nuevoProducto => {
            return Videojuegos.findByIdAndUpdate(req.body.idDelUsuario, { $push: { products: nuevoProducto._id } })
        })
        .then(datos => res.json(datos))
        .catch(console.log)
})

module.exports = router