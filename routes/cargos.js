const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-vampos');
/* const { cargoExiste } = require('../helpers/db-validators'); */
const { existeCargoPorId, cargoExiste } = require('../helpers/db-validators');

const { obtenerCargo,
        obtenerCargos,
        crearCargo,
        actualizarCargo,
        borrarCargo } = require('../controllers/cargo');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');




const router = Router();

router.get('/', obtenerCargos );

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCargoPorId ),
    validarCampos,
], obtenerCargo );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom( cargoExiste ),
    validarCampos,
], crearCargo );

router.put('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCargoPorId ),
    validarCampos,
], actualizarCargo );

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
], borrarCargo );


module.exports = router;