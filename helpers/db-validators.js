const Cargo = require('../models/cargo');
const Usuario = require('../models/usuario');



const cargoExiste = async( cargo ) => {

const existeCargo = await Cargo.findOne({ cargo });
    if ( existeCargo ) {
        throw new Error(`El cargo ${ cargo } ya esta registrado en la BD`);
    }
}
const esCargoValido = async(nombreCargo = '') => {

    const existeCargo = await Cargo.findOne({ nombreCargo });
    if ( !existeCargo ) {
        throw new Error(`El cargo ${ nombreCargo } no está registrado en la BD`);
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
    cargoExiste,
    esCargoValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}

