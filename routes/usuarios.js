
//desestructar express para sacar la funcion Router
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-vampos');
const { esCargoValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete} = require('../controllers/usuarios');





const router = Router();

router.get('/', usuariosGet );

router.post('/', [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExiste ),
        check('cedula',  'Formato de Identificacion no valido' ).isNumeric( ),
        check('cedula',  'Numero de identificacion no valido' ).isLength({ min: 6, max: 12 }),
        check('telefono',  'Numero telefonico no valido ' ).isNumeric( ).isLength({min: 10, max: 16} ),
        check('cargo').custom( esCargoValido ),
        validarCampos,
], usuariosPost );

router.put('/:id',[
        check( 'id', 'No es un Id Valido').isMongoId().custom( existeUsuarioPorId ),
        check('cargo').custom( esCargoValido ),
        validarCampos,
], usuariosPut );

router.delete('/:id',[
        validarJWT,
        esAdminRole,
        check( 'id', 'No es un Id Valido').isMongoId().custom( existeUsuarioPorId ),
        validarCampos,
], usuariosDelete );


module.exports = router;