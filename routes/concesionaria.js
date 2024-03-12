const express = require('express')
const router = express.Router()

const concesionariaController = require('../controllers/concesionariaController')
const { codigo, nombre, codigoVerify, precio, stock } = require('../utils/validations')
const validate = require('../middlewares/validate')
const logRequest = require('../middlewares/logRequest')

//--------------------------Routes--------------------------------------
router.get('/', logRequest, concesionariaController.getAutos) 
router.post('/', [codigo, nombre, precio, stock], logRequest, validate, concesionariaController.createAuto) 
router.put('/:codigo', [codigo, codigoVerify], logRequest, validate, concesionariaController.actualizarAuto) 
router.delete('/:codigo', [codigoVerify], logRequest, validate, concesionariaController.deleteAuto) 


module.exports = router