//Instanciamos las Librerias
var express = require('express');
var router = express.Router();
var RolCtrl = require('../controladores/rolcontroller');

//Exportamos las rutas para tenerlas en el middleware
module.exports = function () {
    router.get('/', RolCtrl.obtenerRoles)//obtener todos los tipos doc
        .post('/', RolCtrl.insertarRol)//insertar un tipo doc
        .get('/:id', RolCtrl.obtenerRol)//obtener un tipo de doc por su id
        .put('/', RolCtrl.actualizarRol)//actualizar un tipo de doc
        .delete('/', RolCtrl.eliminarRol)//eliminar un tipo de doc
    return router;
}