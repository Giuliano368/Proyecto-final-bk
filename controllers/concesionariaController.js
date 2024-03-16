const autoConcesionaria = require('../models/auto')
const axios = require('axios')


const getAutos = async (req, res) => {
    try {
        const autos = await autoConcesionaria.find()
        res.status(200).json({ auto: autos, msg: 'Listado de autos en base de datos' })
    } catch (error) {
        res.status(500).json({ auto: null, msg: 'Error al obtener los autos -' + error.message })
    }
}

const createAuto = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.bluelytics.com.ar/v2/latest')
        const precioEnDolares = Math.round(req.body.precio / data.blue.value_avg)

        const nuevoAuto = { ...req.body, precioDolar: precioEnDolares }

        await autoConcesionaria.create(nuevoAuto)

        res.status(201).json({ auto: nuevoAuto, msg: 'Auto cargado exitosamente' })
    } catch (error) {
        res.status(500).json({ auto: null, msg: 'Error al crear el auto -' + error.message })
    }
}

const actualizarAuto = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.bluelytics.com.ar/v2/latest')
        const precioEnDolares = Math.round(req.body.precio / data.blue.value_avg)

        const auto = await autoConcesionaria.findOne({ codigo: req.params.codigo })
        if (auto) {
            const autoActualizado = { ...req.body, precioEnDolares }
            await autoConcesionaria.findOneAndUpdate({ codigo: req.params.codigo }, autoActualizado)
            res.status(201).json({ auto: autoActualizado, msg: 'Auto actualizado exitosamente' })
        } else {
            res.status(404).json({ auto: null, msg: 'Auto inexistente' })
        }
    } catch (error) {
        res.status(500).json({ auto: null, msg: 'Error al actualizar el auto -' + error.message })
    }

}


const deleteAuto = async (req, res) => {
    try {
        const auto = await autoConcesionaria.findOneAndDelete({ codigo: req.params.codigo })
        res.status(201).json({ msg: 'El auto fue eliminado exitosamente.' })
    } catch (error) {
        res.status(500).json({ auto: null, msg: 'Error al eliminar el auto -' + error.message })
    }
}

module.exports = { getAutos, createAuto, actualizarAuto, deleteAuto }