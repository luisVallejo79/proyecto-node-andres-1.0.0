
const { Schema, model } = require('mongoose');

const EspecialidadSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'La especialidad es obligatoria']
    },
    
    estado: {
        type: Boolean,
        default: true
    },
});

EspecialidadSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Especialidad', EspecialidadSchema );
