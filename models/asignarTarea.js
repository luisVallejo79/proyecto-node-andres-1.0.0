const { Schema, model } = require('mongoose');

const asignarTareaSchema = Schema({

    usuarioAsigna: {
        type: Schema.Types.ObjectId,
        ref : 'Usuario',
        required: true
    },

    tarea: {
        type: Schema.Types.ObjectId,
        ref : 'Tarea',
        required: true
    },
    

    responsable: {
        type: [Schema.Types.ObjectId],
        ref : 'Tarea',
        required: true
    },
    
    fechaCreacion: {
        type : Date,
        default : Date.now()
    },

    fechaEntrega: {
        type : Date
    },
 
    estado: {
        type: Boolean,
        default: true
    },
    
    observaciones: { type: String, default: 'Prueba descripcion asignar tarea' },
    /* disponible: { type: Boolean, defult: true }, */
});

/* asignarTareaSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}; */

module.exports = model( 'AsignarTarea', asignarTareaSchema );
