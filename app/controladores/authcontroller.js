var UsuarioModel = require('../modelos/usuariomodel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//Recibir usuario y contraseña y validar si coinciden
function login(req, res) {
    var UsuarioData =
    {
        nickname_us: req.body.nickname_us,
        contrasena_us: req.body.contrasena_us,
    }
    UsuarioModel.getUsuarioByNick(UsuarioData.nickname_us, function (error, data) {
        //si el usuario existe
        if (typeof data !== 'undefined' && data.length > 0) {
            var user = data;
            UsuarioModel.getPassUsuario(UsuarioData.nickname_us, async function (error, data) {
                //Convertir la fila a cadena y tomar solo el valor de la clave
                var valor = JSON.stringify(data);
                var pass = valor.substring(19, 79);
                await bcrypt.compare(UsuarioData.contrasena_us, pass)
                    .then(match => {
                        if (match) {
                            //Acceso
                            UsuarioModel.getEstadoUsuario(UsuarioData.nickname_us, function (error, data) {
                                var estado = data[0].estado_us;
                                //res.send(estado);
                                if (estado == 'A') {
                                    //Forzar nuevo inicio de sesión después de 8 días
                                    jwt.sign({ user: user }, 'secretkey', { expiresIn: '604800s' }, (err, token) => {
                                        if (err) {
                                            console.log(error);
                                            res.status(500).send({ error });
                                        }
                                        else {
                                            res.json({
                                                token
                                            });
                                        }
                                    });
                                }
                                else {
                                    UsuarioModel.activateUsuario(UsuarioData.nickname_us, function (error, data) {
                                        //si el usuario estaba desactivado mostrar mensaje de activado de nuevo
                                        if (data && data.msg) {
                                            //Forzar nuevo inicio de sesión después de 8 días
                                            jwt.sign({ user: user }, 'secretkey', { expiresIn: '604800s' }, (err, token) => {
                                                if (err) {
                                                    console.log(error);
                                                    res.status(500).send({ error });
                                                }
                                                else {
                                                    res.json({
                                                        token
                                                    });
                                                }
                                            });
                                        }
                                        //si la persona no existe mostrar error
                                        else {
                                            res.status(500).send({
                                                error: "sad :("
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            //Contraseña incorrecta
                            res.status(404).send({ message: 'Contraseña incorrecta' });
                            /*res.status(404).json({
                                "msg": "Contraseña incorrecta"
                            });*/
                        }
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send({ error });
                    });
            });
        }
        //Usuario no existe
        else {
            res.status(404).send({ message: 'Usuario incorrecto' });
            /*res.status(404).json({
                "msg": "Usuario incorrecto"
            });*/
        }
    }).catch(error => console.log(error));
}

//Exportamos el controlador para tenerlo en la zona de rutas
module.exports = {
    login
}