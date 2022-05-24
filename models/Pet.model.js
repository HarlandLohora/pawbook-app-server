const { Schema, model } = require("mongoose")


const PetSchema = new Schema({
    name: String,
    breed: String,
    pedigree: Boolean,
    photo: String,
    age: Number
}, { timestamps: true })

module.exports = model("Pet", PetSchema)