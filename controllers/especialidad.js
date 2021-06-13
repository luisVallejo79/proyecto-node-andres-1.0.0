const { response, request } = require('express');
const  Especialidad   = require('../models/especialidad'); 

const obtenerEspecialidad = async( req, res = response )=>{
    const { id } = req.params;
    const especialidad = await Especialidad.findById( id );
                            /* .populate('usuario', 'nombre'); */

    res.json( especialidad );
      
   
}

const obtenerEspecialidades = async( req = request, res = response )=>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, especialidades ] = await Promise.all([
        Especialidad.countDocuments(query),
        Especialidad.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        especialidades
    });
      
   
}

const crearEspecialidad = async(req = request, res = response ) => {
    
    const nombre = req.body.nombre.toUpperCase();
    const estado = req.body.estado;

    const especialidad = new Especialidad({nombre, estado});

    //guardar en db
    await especialidad.save();
 
    res.json({
        especialidad
    });
      
}

const actualizarEspecialidad = async( req, res = response )=>{

    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    const especialidad = await Especialidad.findByIdAndUpdate( id, resto );
    
  
    res.json(especialidad);
   
}

const borrarEspecialidad = async( req, res = response )=>{
    const { id } = req.params;
    const especialidad = await Especialidad.findByIdAndUpdate( id, { estado: false } );

    res.json(especialidad);
}

module.exports = {
     obtenerEspecialidad,
        obtenerEspecialidades,
        crearEspecialidad,
        actualizarEspecialidad,
        borrarEspecialidad 
}