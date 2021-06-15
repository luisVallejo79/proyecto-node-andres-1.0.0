const Cargo = require('../models/cargo');
const Usuario = require('../models/usuario');
const Especialidad = require('../models/especialidad');





const especialidadExiste = async( especialidad ) => {

    const existeEspecialidad = await Especialidad.findOne({ especialidad });
        if ( existeEspecialidad ) {
            throw new Error(`El cargo ${ especialidad } ya esta registrado en la BD`);
        }
    }

const existeEspecialidadPorId = async( id ) => {

    // Verificar si la especialidad existe
    const especialidad = await Especialidad.findById( id );
    if ( !especialidad ) {
        throw new Error(`No existe especialidad con el Id ${ id }` );
    }
}


const cargoExiste = async( nombreCargo ) => {

    const existeCargo = await Cargo.findOne({ nombreCargo });
    if ( existeCargo ) {
        throw new Error(`El cargo ${ nombreCargo } ya esta registrado en la BD`);
    }
}
const esCargoValido = async(nombreCargo = '') => {

    const existeCargo = await Cargo.findOne({ nombreCargo });
    if ( !existeCargo ) {
        throw new Error(`El cargo ${ nombreCargo } no está registrado en la BD`);
    }
}
const existeCargoPorId = async( id ) => {

    // Verificar si el cargo existe
    const existeCargoId = await Cargo.findById(id);
    if ( !existeCargoId ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Categorias
 */
const existeCategoriaPorId = async( id ) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Productos
 */
const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


module.exports = {
    especialidadExiste,
    existeEspecialidadPorId,
    cargoExiste,
    esCargoValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeCargoPorId
}

 