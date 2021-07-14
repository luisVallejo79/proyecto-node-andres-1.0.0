const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-vampos'); 
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


const { obtenerTareasAsginadas, 
        obtenerTareaAsginada,
        crearAsignarTarea,
        actualizarTareaAsignada,
        borrarTareaAsignada} = require('../controllers/asignarTarea');
const { validarIdArray } = require('../helpers/db-validators');


const router = Router();

router.get('/', obtenerTareasAsginadas ); 

router.get('/:id', obtenerTareaAsginada );

router.post('/',[
        check('usuarioAsigna', 'El que asigna es obligatorio').notEmpty(),
        check('usuarioAsigna', 'No es un Id mongo Valido').isMongoId(),
        
        validarJWT,
        esAdminRole,
        /* check('[responsable]', 'No es un Id mongo Valido').isMongoId(), */
        validarIdArray,
        validarCampos
],
  crearAsignarTarea );

router.put('/:id', actualizarTareaAsignada );

router.delete('/:id', borrarTareaAsignada );


module.exports = router;