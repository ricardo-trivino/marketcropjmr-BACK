var UsuarioModel = require('../modelos/usuariomodel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

function registroCliente(req, res) {
    //creamos un objeto Json con los datos del cliente con la estructura del insert
    //INSERT INTO `usuarios`(`id_usuario`, `tipo_doc_us`, `num_doc_us`, `pnombre_us`, `snombre_us`, `papellido_us`, `sapellido_us`, `contrasena_us`, `nickname_us`, `rol_us`, `estado_us`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]')
    var UsuarioData =
    {
        id_usuario: null,
        tipo_doc_us: req.body.tipo_doc_us,
        num_doc_us: req.body.num_doc_us,
        pnombre_us: req.body.pnombre_us,
        snombre_us: req.body.snombre_us,
        papellido_us: req.body.papellido_us,
        sapellido_us: req.body.sapellido_us,
        contrasena_us: req.body.contrasena_us,
        nickname_us: req.body.nickname_us,//Validar que no haya acentos, espacios o comiencen con numeros, etc
        rol_us: 1,
        estado_us: 'A',
    };
    UsuarioModel.insertCliente(UsuarioData, function (error, data) {
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).send({ error: "sad :(" });
        }
    });
}

//Exportamos el controlador para tenerlo en la zona de rutas
module.exports = {
    registroCliente
}