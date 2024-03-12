const mongoose = require('mongoose')
const { Schema } = mongoose

const autoSchema = new Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        unique: false
    },
    modelo: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    importado: {
        type: Boolean,
        default: true
    },
    precioDolar: {
        type: Number,
        required: false
    }
}, { timestamps: true })


const autoConcesionaria = mongoose.model('autoConcesionaria', autoSchema)

module.exports = autoConcesionaria