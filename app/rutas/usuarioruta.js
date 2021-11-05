//Instanciamos las Librerias
var express = require('express');
var router = express.Router();
var UsuarioCtrl = require('../controladores/usuariocontroller');

//Exportamos las rutas para tenerlas en el middleware
module.exports = function () {
    router.get('/', UsuarioCtrl.obtenerUsuarios)//obtener todos los tipos doc
        .post('/', UsuarioCtrl.insertarUsuario)//insertar un tipo doc
        .get('/:id', UsuarioCtrl.obtenerUsuario)//obtener un tipo de doc por su id
        .put('/', UsuarioCtrl.actualizarUsuario)//actualizar un tipo de doc
        .delete('/', UsuarioCtrl.eliminarUsuario)//eliminar un tipo de doc
return router;
}