//Instanciamos las Librerias
var express = require('express');
var router = express.Router();
var DetalleFacturaCtrl = require('../controladores/detallefacturacontroller');

//Exportamos las rutas para tenerlas en el middleware
module.exports = function () {
    router.get('/', DetalleFacturaCtrl.obtenerDetallesFacturas)//obtener todos los tipos doc
        .post('/', DetalleFacturaCtrl.insertarDetalleFactura)//insertar un tipo doc
        .get('/:id', DetalleFacturaCtrl.obtenerDetalleFactura)//obtener un tipo de doc por su id
        .put('/', DetalleFacturaCtrl.actualizarDetalleFactura)//actualizar un tipo de doc
        .delete('/', DetalleFacturaCtrl.eliminarDetalleFactura)//eliminar un tipo de doc
    return router;
}