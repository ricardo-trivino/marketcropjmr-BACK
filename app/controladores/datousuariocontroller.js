var DatoUsuarioModel = require('../modelos/datousuariomodel');

function insertarDatoUsuario(req, res) {
    //creamos un objeto Json con los datos del rol con la estructura del insert
    //INSERT INTO `datos_usuario`(`id_dato_us`, `usuario`, `dato_us_clave`, `dato_us_valor`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]')
    var DatoUsuarioData =
    {
        id_dato_us: null,
        usuario: req.body.usuario,
        dato_us_clave: req.body.dato_us_clave,
        dato_us_valor: req.body.dato_us_valor,
    };
    DatoUsuarioModel.insertDatoUsuario(DatoUsuarioData, function (error, data) {
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).send({ error: "sad :(" });
        }
    });
}

function obtenerDatosUsuario(req, res) {
    DatoUsuarioModel.getDatosUsuario(function (error, data) {
        res.status(200).json(data);
    });
}

function obtenerDatoUsuario(req, res) {
    var id = req.params.id;
    //Revisar si el id es valido
    if (!isNaN(id)) {
        DatoUsuarioModel.getDatoUsuario(id, function (error, data) {
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
function actualizarDatoUsuario(req, res) {
    var DatoUsuarioData =
    {
        id_dato_us: req.body.id_dato_us,
        usuario: req.body.usuario,
        dato_us_clave: req.body.dato_us_clave,
        dato_us_valor: req.body.dato_us_valor,
    };

    DatoUsuarioModel.updateDatoUsuario(DatoUsuarioData, function (error, data) {
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

function eliminarDatoUsuario(req, res) {
    var DatoUsuarioData =
    {
        id_dato_us: req.body.id_dato_us,
        usuario: req.body.usuario,
        dato_us_clave: req.body.dato_us_clave,
        dato_us_valor: req.body.dato_us_valor,
    };

    DatoUsuarioModel.deleteDatoUsuario(DatoUsuarioData, function (error, data) {
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
    insertarDatoUsuario,
    obtenerDatosUsuario,
    obtenerDatoUsuario,
    actualizarDatoUsuario,
    eliminarDatoUsuario
}