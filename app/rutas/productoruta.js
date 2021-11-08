//Instanciamos las Librerias
var express = require('express');
var router = express.Router();
var ProductoCtrl = require('../controladores/productocontroller');

//Exportamos las rutas para tenerlas en el middleware
module.exports = function () {
    router.get('/', ProductoCtrl.obtenerProductos)//obtener todos los tipos doc
        .post('/', ProductoCtrl.insertarProducto)//insertar un tipo doc
        .get('/:id', ProductoCtrl.obtenerProducto)//obtener un tipo de doc por su id
        .put('/', ProductoCtrl.actualizarProducto)//actualizar un tipo de doc
        .delete('/', ProductoCtrl.eliminarProducto)//eliminar un tipo de doc
    return router;
}