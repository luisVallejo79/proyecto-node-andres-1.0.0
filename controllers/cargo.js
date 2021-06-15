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
    const estado = req.body.estado;

    const cargo = new Cargo({nombreCargo, estado });

    //guardar en db
    await cargo.save();
 
    res.json({
        cargo
    });
    

}

const actualizarCargo = async ( req, res = response )=>{
    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    const cargo = await Cargo.findByIdAndUpdate( id, resto );

    res.json(cargo);
}

const borrarCargo = async( req, res = response )=>{

    const { id } = req.params;
    const cargo = await Cargo.findByIdAndUpdate( id, { estado: false } );

    res.json(cargo);
    
}

module.exports = {
    obtenerCargo,
    obtenerCargos,
    crearCargo,
    actualizarCargo,
    borrarCargo

}