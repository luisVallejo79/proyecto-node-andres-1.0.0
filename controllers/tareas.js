const { response, request } = require('express');
const Tarea = require('../models/tarea'); 


const obtenerTarea = async( req, res = response )=>{
    
    const { id } = req.params;
    const tarea = await Tarea.findById( id )
                        .populate('especialidad', 'nombre')

    res.json( tarea );
      
   
}

const obtenerTareas = async( req = request, res = response )=>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, tareas ] = await Promise.all([
        Tarea.countDocuments(query),
        Tarea.find(query)
            .populate('especialidad', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        tareas
    });
       
      
   
} 

const crearTarea = async(req, res = response ) => {

    const body = req.body;

    const tarea = new Tarea(body) 
    
    
    const tareaDB = await Tarea.findOne({nombre : body.nombre });

    if(tareaDB){
        return res.status(400).json({
            msn: `La tarea ${ tareaDB.nombre } ya existe en la base datos`
        });

    } 
        
    //guardar en db
    await tarea.save(); 
 
    res.json({
        tarea
    });
      
}

const actualizarTarea = async( req, res = response )=>{

    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    const tarea = await Tarea.findByIdAndUpdate( id, resto );
    
  
    res.json(tarea);
   
}

const borrarTarea = async( req, res = response )=>{
    const { id } = req.params;
    const tarea = await Tarea.findByIdAndUpdate( id, { estado: false } );

    res.json(tarea);
} 

const asignarTarea = ( idAsigna, idAsignado, idTarea )=>{
    
    
}



module.exports = {
        crearTarea,
        obtenerTareas,
        obtenerTarea,
        actualizarTarea,
        borrarTarea 
}