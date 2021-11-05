//Instanciamos las Librerias
var express = require('express');
var router = express.Router();
var TipoDocCtrl = require('../controladores/tipodoccontroller');

//Exportamos las rutas para tenerlas en el middleware
module.exports = function () {
    router.get('/', TipoDocCtrl.obtenerTiposDoc)//obtener todos los tipos doc
        .post('/', TipoDocCtrl.insertarTipoDoc)//insertar un tipo doc
        .get('/:id', TipoDocCtrl.obtenerTipoDoc)//obtener un tipo de doc por su id
        .put('/', TipoDocCtrl.actualizarTipoDoc)//actualizar un tipo de doc
        .delete('/', TipoDocCtrl.eliminarTipoDoc)//eliminar un tipo de doc
return router;
}