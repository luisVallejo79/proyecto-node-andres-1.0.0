const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { emailExiste } = require('../helpers/db-validators');


const usuariosGet = async(req, res = response) => {

    const { limite = 5, desde = 0} = req.query;
 
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments( { estado : true}),
        Usuario.find( { estado : true})
        .skip( Number(desde))                
        .limit( Number(limite) )

    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {
    const { nombre, cedula, telefono, direccion, correo, password, profesion, cargo}  = req.body;

    const usuario = new Usuario( { nombre, cedula, telefono, direccion, correo, password, profesion, cargo} );
    
    //verificar si el correo existe
    emailExiste();

    const existeCedula = await Usuario.findOne({ cedula });
    if ( existeCedula ) {

        return res.status(400).json({
            Error : "Numero de identificacion ya se encuentra registrado en la base de datos"});
    }
    const existeTelefono = await Usuario.findOne({ telefono });
    if ( existeTelefono ) {

        return res.status(400).json({
            Error : "Numero de telefono ya se encuentra registrado en la base de datos"});
    }


    ///encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );


    //gudardar en bd
    await usuario.save();


    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {
    const id = req.params.id;

    const { _id, password, ...resto } = req.body;

    if( password ){
    ///encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);
    
    res.json({
        msg: 'Usuario actualizado correctamente',
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    res.json({
        msg: 'Usuario eliminado correctamente',
        usuario
    });
}


module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}