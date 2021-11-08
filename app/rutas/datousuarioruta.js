//Instanciamos las Librerias
var express = require('express');
var router = express.Router();
var DatoUsuarioCtrl = require('../controladores/datousuariocontroller');

//Exportamos las rutas para tenerlas en el middleware
module.exports = function () {
    router.get('/', DatoUsuarioCtrl.obtenerDatosUsuario)//obtener todos los tipos doc
        .post('/', DatoUsuarioCtrl.insertarDatoUsuario)//insertar un tipo doc
        .get('/:id', DatoUsuarioCtrl.obtenerDatoUsuario)//obtener un tipo de doc por su id
        .put('/', DatoUsuarioCtrl.actualizarDatoUsuario)//actualizar un tipo de doc
        .delete('/', DatoUsuarioCtrl.eliminarDatoUsuario)//eliminar un tipo de doc
    return router;
}