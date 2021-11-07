var RolModel = require('../modelos/rolmodel');

function insertarRol(req, res) {
    //creamos un objeto Json con los datos del rol con la estructura del insert
    //INSERT INTO `tipos_doc`(`id_tipo_doc`, `tipo_doc`) VALUES ('[value-1]','[value-2]')`
    var RolData =
    {
        id_rol: null,
        rol: req.body.rol,
    };
    RolModel.insertRol(RolData, function (error, data) {
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).send({ error: "sad :(" });
        }
    });
}

function obtenerRoles(req, res) {
    RolModel.getRoles(function (error, data) {
        res.status(200).json(data);
    });
}

function obtenerRol(req, res) {
    var id = req.params.id;
    //Revisar si el id es valido
    if (!isNaN(id)) {
        RolModel.getRol(id, function (error, data) {
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
function actualizarRol(req, res) {
    var RolData =
    {
        id_rol: req.body.id_rol,
        rol: req.body.rol,
    };

    RolModel.updateRol(RolData, function (error, data) {
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

function eliminarRol(req, res) {
    var RolData =
    {
        id_rol: req.body.id_rol,
        rol: req.body.rol,
    };

    RolModel.deleteRol(RolData, function (error, data) {
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
    insertarRol,
    obtenerRoles,
    obtenerRol,
    actualizarRol,
    eliminarRol
}