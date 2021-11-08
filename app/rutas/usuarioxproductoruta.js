//Instanciamos las Librerias
var express = require('express');
var router = express.Router();
var UsuarioXProductoCtrl = require('../controladores/usuarioxproductocontroller');

//Exportamos las rutas para tenerlas en el middleware
module.exports = function () {
    router.get('/', UsuarioXProductoCtrl.obtenerUsuariosXProductos)//obtener todos los tipos doc
        .post('/', UsuarioXProductoCtrl.insertarUsuarioXProducto)//insertar un tipo doc
        .get('/:id', UsuarioXProductoCtrl.obtenerUsuarioXProducto)//obtener un tipo de doc por su id
        .put('/', UsuarioXProductoCtrl.actualizarUsuarioXProducto)//actualizar un tipo de doc
        .delete('/', UsuarioXProductoCtrl.eliminarUsuarioXProducto)//eliminar un tipo de doc
    return router;
}