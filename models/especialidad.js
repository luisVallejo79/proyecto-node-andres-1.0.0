
const { Schema, model } = require('mongoose');

const EspecialidadSchema = Schema({
    nombreEspecialidad: {
        type: String,
        required: [true, 'La especialidad es obligatoria']
    },
    
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model( 'Especialidad', EspecialidadSchema );
