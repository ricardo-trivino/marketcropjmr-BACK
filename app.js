var express = require('express');
//var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser'), port = 3000;
var http = require('http');//protocolo de intercambio de archivos
var path = require('path');//ruta

var conexion = require('./app/config/index');

//Middleware
var authtoken = require('./app/middlewares/authtoken');

//Rutas
var auth = require('./app/rutas/authruta');
var registro = require('./app/rutas/registroruta');
var tipodoc = require('./app/rutas/tipodocruta');
var rol = require('./app/rutas/rolruta');
var usuario = require('./app/rutas/usuarioruta');

var app = express();

app.set('port', process.env.PORT || port);//metodo para recibir puerto y proceso

app.use(bodyParser.json({ type: 'application/json', limit: '10mb' }));//recibe un cuerpo y un objeto json
app.use(bodyParser.urlencoded({ extended: false }));//recibe url codificada
app.use(express.static(path.join(__dirname, 'public')));//recibe ruta

app.use(function (req, res, next) {

  // Stio web al que desea permitir que se conecte
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // A que métodos que desea dar permisos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // A que  encabezados se les va a dar permiso
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  //Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas
  //a la API (por ejemplo, en caso de que use sesiones)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pase a la siguiente capa de middleware
  next();
});

//Middleware antes del servicio
app.use(authtoken);

//Rutas para el servicio
app.use('/auth', auth());
app.use('/registro', registro());
app.use('/tipodoc', tipodoc());
app.use('/rol', rol());
app.use('/usuario', usuario());

http.createServer(app).listen(app.get('port'), function () {
  console.log('Servidor Express escuchando por el puerto ' + app.get('port'));
});

module.exports = app;