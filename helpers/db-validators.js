const Cargo = require('../models/cargo');
const Usuario = require('../models/usuario');
const Especialidad = require('../models/especialidad');
const AsignarTarea = require('../models/asignarTarea');
const { response } = require('express');



const validarIdArray = async( req, res = response )=>{
    
    
    const {responsable} = req.body;
    
    let logintudArray = responsable.length
    console.log(logintudArray);
    
    responsable.forEach(element => {
        console.log(element);
        console.log('****************');

        const responsableId = AsignarTarea.findOne( element );
        if(!responsableId){
            console.log(`Usuario ${element} no encontrado`)
        }
        //validar que exista el Identificacion
    });
      
    /* 
    const estado = req.body.estado;

    const especialidad = new Especialidad({nombre, estado});
    const { id } = req.params;
    const cargo = await Cargo.findById( id );
                            /* .populate('usuario', 'nombre');  */

    res.json( responsable);
    
}

const isMongoIdValido = async( req, res = response )=>{

    const body = req.body;
   /* c onst especialidad = await Especialidad.findById( id ); */
                            /* .populate('usuario', 'nombre'); */

    res.json( body );
      
   
}
/* const isMongoIdValido = async( [responsable]) => {

    const mongoId = await responsable.check().isMongoId();
    if ( !mongoId ) {
        throw new Error(`Id no valido`);
    }
} */

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
        throw new Error(`El cargo ${ nombreCargo } no est?? registrado en la BD`);
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
        throw new Error(`El correo: ${ correo }, ya est?? registrado`);
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
    existeCargoPorId,
    isMongoIdValido,
    validarIdArray
}

 