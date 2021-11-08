//Instanciamos las Librerias
var express = require('express');
var router = express.Router();
var FacturaCtrl = require('../controladores/facturacontroller');

//Exportamos las rutas para tenerlas en el middleware
module.exports = function () {
    router.get('/', FacturaCtrl.obtenerFacturas)//obtener todos los tipos doc
        .post('/', FacturaCtrl.insertarFactura)//insertar un tipo doc
        .get('/:id', FacturaCtrl.obtenerFactura)//obtener un tipo de doc por su id
        .put('/', FacturaCtrl.actualizarFactura)//actualizar un tipo de doc
        .delete('/', FacturaCtrl.eliminarFactura)//eliminar un tipo de doc
    return router;
}