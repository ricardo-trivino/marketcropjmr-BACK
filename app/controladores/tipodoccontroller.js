var TipoDocModel = require('../modelos/tipodocmodel');

function insertarTipoDoc(req, res) {
    //creamos un objeto Json con los datos del tipo de documento con la estructura del insert
    //INSERT INTO `tipos_doc`(`id_tipo_doc`, `tipo_doc`) VALUES ('[value-1]','[value-2]')`
    var TipoDocData =
    {
        id_tipo_doc: null,
        tipo_doc: req.body.tipo_doc,
    };
    TipoDocModel.insertTipoDoc(TipoDocData, function (error, data) {
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).send({ error: "sad :(" });
        }
    });
}

function obtenerTiposDoc(req, res) {
    TipoDocModel.getTiposDoc(function (error, data) {
        res.status(200).json(data);
    });
}

function obtenerTipoDoc(req, res) {
    var id = req.params.id;
    //Revisar si el id es valido
    if (!isNaN(id)) {
        TipoDocModel.getTipoDoc(id, function (error, data) {
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
function actualizarTipoDoc(req, res) {
    var TipoDocData =
    {
        id_tipo_doc: req.body.id_tipo_doc,
        tipo_doc: req.body.tipo_doc,
    };

    TipoDocModel.updateTipoDoc(TipoDocData, function (error, data) {
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

function eliminarTipoDoc(req, res) {
    var TipoDocData =
    {
        id_tipo_doc: req.body.id_tipo_doc,
        tipo_doc: req.body.tipo_doc,
    };

    TipoDocModel.deleteTipoDoc(TipoDocData, function (error, data) {
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
    insertarTipoDoc,
    obtenerTiposDoc,
    obtenerTipoDoc,
    actualizarTipoDoc,
    eliminarTipoDoc
}