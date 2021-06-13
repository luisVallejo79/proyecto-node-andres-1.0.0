const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-vampos');
/* const { cargoExiste } = require('../helpers/db-validators'); */

const { obtenerEspecialidad,
        obtenerEspecialidades,
        crearEspecialidad,
        actualizarEspecialidad,
        borrarEspecialidad } = require('../controllers/cargo');



const router = Router();

router.get('/', obtenerEspecialidades );

router.get('/:id', obtenerEspecialidad );

router.post('/', crearEspecialidad );

router.put('/:id', actualizarEspecialidad );

router.delete('/:id', borrarEspecialidad );


module.exports = router;