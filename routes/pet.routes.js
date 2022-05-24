const router = require("express").Router()
const Pet = require("../models/Pet.model")
const User = require("../models/User.model")

//Create
//Read -> all y a detalle
//Update
//Delete
router.get("/all", (req, res) => {
    Pet.find()
        .then(todaslasmascotas => {
            res.json({ mascotas: todaslasmascotas, fecha: new Date() })
        })
        .catch(console.log)
})


router.get("/details/:id", (req, res) => {
    const { id } = req.params
    Pet.findById(id)
        .then(detalles => {
            res.json(detalles)
        })
        .catch(console.log)
})


router.post("/create", (req, res) => {
    console.log("los datos a guardar son", req.body)

    Pet.create(req.body)
        .then(nuevaMascota => {
            const { _id } = nuevaMascota
            User
                .findByIdAndUpdate(req.body.userId, {
                    $push: { pets: _id }
                }, { new: true })
                .then(usuarioActualizado => {
                    console.log(usuarioActualizado)
                    res.json(usuarioActualizado)
                })
        })
        .catch(console.log)
})


router.put("/edit/:id", (req, res) => {
    const { id } = req.params
    Pet.findByIdAndUpdate(id, req.body, { new: true })
        .then(mascotaActualizada => {
            res.json(mascotaActualizada)
        })
        .catch(console.log)
})


router.delete("/delete/:id", (req, res) => {
    //id -> mascota id
    //req.body.userId
    const { id } = req.params
    Pet.findByIdAndRemove(id)
        .then(eliminado => {
            User.findByIdAndUpdate(req.body.userId, { $pull: { pets: id } }, { new: true })
                .then(usuarioActualizado => {
                    res.json(usuarioActualizado)
                }).catch(console.log)
        })
        .catch(console.log)
})



module.exports = router;