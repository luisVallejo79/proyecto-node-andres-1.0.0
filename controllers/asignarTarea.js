const { response, request } = require('express');
const AsignarTarea = require('../models/asignarTarea'); 



const obtenerTareaAsginada = async( req, res = response )=>{

    res.json({
        msg:"Respondiendo GET tarea asignada by Id"
    });
         
   
}

const obtenerTareasAsginadas = async( req = request, res = response )=>{
    res.json({
        msg:"Respondiendo GET tareas asignadas "
    });
    
  
} 

const crearAsignarTarea = async(req, res = response ) => {

    const body = req.body;

    const asignarTarea = new AsignarTarea(body) 
    
    
 /*    const asignarTareaDB = await asignarTarea.findOne({nombre : body.nombre });

    if(asignarTareaDB){
        return res.status(400).json({
            msn: `La tarea ${ tareaDB.nombre } ya se esta realizando `
        });

    } 
   */      
    //guardar en db
   /*  await asignarTarea.save();   */
 
    res.json({
        asignarTarea
    });
      
}

const actualizarTareaAsignada = async( req, res = response )=>{

    res.json({
        msg:"Respondiendo PUT tareas asignadas "
    });
   
}

const borrarTareaAsignada = async( req, res = response )=>{
    res.json({
        msg:"Respondiendo DELETE tareas asignadas "
    });

}

module.exports = {
    obtenerTareasAsginadas, 
    obtenerTareaAsginada,
    crearAsignarTarea,
    actualizarTareaAsignada,
    borrarTareaAsignada
}