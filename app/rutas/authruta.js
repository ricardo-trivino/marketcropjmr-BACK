//Instanciamos las Librerias
var express = require('express');
var router = express.Router();
var AuthCtrl = require('../controladores/authcontroller');

//Exportamos las rutas para tenerlas en el middleware
module.exports = function () {
    router.post('/login', AuthCtrl.login);//ruta para el login
    return router;
}