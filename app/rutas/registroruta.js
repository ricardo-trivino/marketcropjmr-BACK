//Instanciamos las Librerias
var express = require('express');
var router = express.Router();
var RutaCtrl = require('../controladores/registrocontroller');

//Exportamos las rutas para tenerlas en el middleware
module.exports = function () {
    router.post('/registrarse', RutaCtrl.registroCliente);//ruta para el login
    return router;
}