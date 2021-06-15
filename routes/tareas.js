const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-vampos');
const { existeEspecialidadPorId } = require('../helpers/db-validators')


const { obtenerTareas, 
        obtenerTarea,
        crearTarea,
       actualizarTarea,
        borrarTarea} = require('../controllers/tareas');




const router = Router();

router.get('/', obtenerTareas ); 

router.get('/:id', obtenerTarea );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('especialidad', 'No es un Id mongo Valido').isMongoId(),
    check('especialidad').custom( existeEspecialidadPorId),
validarCampos,
], crearTarea );

router.put('/:id', actualizarTarea );

router.delete('/:id', borrarTarea );


module.exports = router;