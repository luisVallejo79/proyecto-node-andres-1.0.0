const { response } = require('express');
const  Cargo  = require('../models/cargo');

const obtenerCargo = async( req, res = response )=>{
    const { id } = req.params;
    const cargo = await Cargo.findById( id );
                            /* .populate('usuario', 'nombre'); */

    res.json( cargo );
}

const obtenerCargos = async( req, res = response )=>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, cargos ] = await Promise.all([
        Cargo.countDocuments(query),
        Cargo.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        cargos
    });
}

const crearCargo = async(req, res = response ) => {

    const nombreCargo = req.body.nombre.toUpperCase();

    try {
        // Generar la data a guardar
    const data = { nombreCargo }

    const cargo = new Cargo ( data );

    // Guardar DB
    await cargo.save();

    res.status(201).json(cargo);

    } catch (error) {
         res.json( ' Error al guardar nuevo cargo en la base de datos, verifique la informacion ');
        
    }

/*     const cargoDB = await Cargo.findOne({ nombre });

    if ( cargoDB ) {
        return res.status(400).json({
            msg: `El cargo ${ cargoDB.nombre }, ya existe`
        });
    } */

   

}

const actualizarCargo = ( req, res = response )=>{
    res.json({
        msg : " PUT - Respondiendo desde controlador"
    });
}

const borrarCargo = ( req, res = response )=>{
    res.json({
        msg : " DELETE - Respondiendo desde controlador"
    });
}



module.exports = {
    obtenerCargo,
    obtenerCargos,
    crearCargo,
    actualizarCargo,
    borrarCargo

}