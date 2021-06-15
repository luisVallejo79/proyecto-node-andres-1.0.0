const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-vampos');
const { existeEspecialidadPorId, especialidadExiste } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const { obtenerEspecialidad,
        obtenerEspecialidades,
        crearEspecialidad,
        actualizarEspecialidad,
        borrarEspecialidad } = require('../controllers/especialidad');





const router = Router();

router.get('/', obtenerEspecialidades );

router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeEspecialidadPorId),
    validarCampos,
], obtenerEspecialidad );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom(especialidadExiste),
    validarCampos,
], crearEspecialidad );

router.put('/:id', actualizarEspecialidad );

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
], borrarEspecialidad );


module.exports = router;