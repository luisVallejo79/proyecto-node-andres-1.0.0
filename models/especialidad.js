
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

module.exports = model( 'Especialidad', EspecialidadSchema );
