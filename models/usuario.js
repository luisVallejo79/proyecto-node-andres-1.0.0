
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
    cedula: {
        type: String,
        required: [true, 'La Cedula es obligatoria'],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
        unique: true
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    profesion: {
        type: String,
        required: [true, 'La profesion es obligatoria']
    },
    
    cargo: {
        type: String,
        required: [true, 'El cargo es obligatorio']
        
    },
    estado: {
        type: Boolean,
        default: true
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
