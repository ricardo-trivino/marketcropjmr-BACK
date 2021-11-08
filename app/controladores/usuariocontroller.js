var UsuarioModel = require('../modelos/usuariomodel');

function insertarUsuario(req, res) {
    //creamos un objeto Json con los datos del tipo de documento con la estructura del insert
    //INSERT INTO `tipos_doc`(`id_tipo_doc`, `tipo_doc`) VALUES ('[value-1]','[value-2]')`
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
        nickname_us: req.body.nickname_us,
        rol_us: req.body.rol_us,
        estado_us: req.body.estado_us,
    };
    UsuarioModel.getUsuarioByNick(UsuarioData.nickname_us, function (error, data) {
        //si el usuario existe
        if (typeof data !== 'undefined' && data.length > 0) {
            res.status(404).json({
                "msg": "Este usuario ya existe, debe iniciar sesión"
            });
        }
        //el usuario no existe
        else {
            UsuarioModel.getUsuarioCedula(UsuarioData.num_doc_us, function (error, data) {
                //si la cedula existe
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(404).json({
                        "msg": "Esta cedula ya existe, comuniquese con el administrador"
                    });
                }
                //la cedula no existe
                else {
                    UsuarioModel.insertUsuario(UsuarioData, function (error, data) {
                        if (data) {
                            res.status(200).json(data);
                        }
                        else {
                            res.status(500).send({ error: "sad :(" });
                        }
                    }).catch(error => console.log(error));
                }
            }).catch(error => console.log(error));
        }
    }).catch(error => console.log(error));
}

function obtenerUsuarios(req, res) {
    UsuarioModel.getUsuarios(function (error, data) {
        res.status(200).json(data);
    });
}

function obtenerUsuario(req, res) {
    var id = req.params.id;
    //Revisar si el id es valido
    if (!isNaN(id)) {
        UsuarioModel.getUsuario(id, function (error, data) {
            //si la persona existe mostrar en formato json
            if (typeof data !== 'undefined' && data.length > 0) {
                res.status(200).json(data);
            }
            //en otro caso mostrar una respuesta de no existe
            else {
                res.status(404).json({
                    "msg": "Registro no Existe"
                });
            }
        });
    }
    else {
        res.status(500).json({ "msg": "error" });
    }
}

//Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
function actualizarUsuario(req, res) {
    var UsuarioData =
    {
        id_usuario: req.body.id_usuario,
        tipo_doc_us: req.body.tipo_doc_us,
        num_doc_us: req.body.num_doc_us,
        pnombre_us: req.body.pnombre_us,
        snombre_us: req.body.snombre_us,
        papellido_us: req.body.papellido_us,
        sapellido_us: req.body.sapellido_us,
        contrasena_us: req.body.contrasena_us,
        nickname_us: req.body.nickname_us,
        rol_us: req.body.rol_us,
        estado_us: req.body.estado_us,
    };

    UsuarioModel.updateUsuario(UsuarioData, function (error, data) {
        if (data && data.msg) {
            res.status(200).json(data);
        }
        else {
            res.status(500).send({
                error: "sad :("
            });
        }
    });
}

function eliminarUsuario(req, res) {
    var UsuarioData =
    {
        id_usuario: req.body.id_usuario,
        tipo_doc_us: req.body.tipo_doc_us,
        num_doc_us: req.body.num_doc_us,
        pnombre_us: req.body.pnombre_us,
        snombre_us: req.body.snombre_us,
        papellido_us: req.body.papellido_us,
        sapellido_us: req.body.sapellido_us,
        contrasena_us: req.body.contrasena_us,
        nickname_us: req.body.nickname_us,
        rol_us: req.body.rol_us,
        estado_us: req.body.estado_us,
    };

    UsuarioModel.deleteUsuario(UsuarioData, function (error, data) {
        if (data && data.msg) {
            res.status(200).json(data);
        }
        else {
            res.status(500).send({
                error: "sad :("
            });
        }
    });
}

//Exportamos el controlador para tenerlo en la zona de rutas
module.exports = {
    insertarUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
}