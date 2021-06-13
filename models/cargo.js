
const { Schema, model } = require('mongoose');

const CargoSchema = Schema({
    nombreCargo: {
        type: String,
        required: [true, 'El nombre del cargo es obligatorio'],
        unique: true
    },
    
    estado: {
        type: Boolean,
        default: true
    }
    
});

CargoSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}

module.exports = model( 'Cargo', CargoSchema );
