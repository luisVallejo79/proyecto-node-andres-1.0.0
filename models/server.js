const express = require('express');
const cors = require('cors');

const { dbConection } = require('../database/configdb');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT
        this.authPath = '/auth'
        this.cargosPath = '/cargos'
        this.usuariosPath = '/usuarios'
        this.especialidadPath = '/especialidad'
        this.tareaPath = '/tareas'
        this.asignarTareaPath = '/asignartareas'

        

        //conectar a bd
        this.conectarDB();

        //middlewares
        this.middlewares();


        //rutas de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares(){ 
        //directorio publico
        this.app.use(express.static('public'));
        //CORS
        this.app.use(cors())
        //Lectura y parseo del body
        this.app.use( express.json());
        // Fileupload - Carga de archivos

    }
    routes(){
        //utilizar middleware para llamar los paths
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.cargosPath, require('../routes/cargos'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.especialidadPath, require('../routes/especialidad'));
        this.app.use(this.tareaPath, require('../routes/tareas'));
        this.app.use(this.asignarTareaPath, require('../routes/asignartareas')); 

    }
    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
          })
     };
}

module.exports = Server;