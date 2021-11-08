var DetalleFacturaModel = require('../modelos/detallefacturamodel');

function insertarDetalleFactura(req, res) {
    //creamos un objeto Json con los datos del rol con la estructura del insert
    //INSERT INTO `detalle_factura`(`id_detalle_fact`, `factura`, `producto`) VALUES ('[value-1]','[value-2]','[value-3]')
    var DetalleFacturaData =
    {
        id_detalle_fact: null,
        factura: req.body.factura,
        producto: req.body.producto,
    };
    DetalleFacturaModel.insertDetalleFactura(DetalleFacturaData, function (error, data) {
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).send({ error: "sad :(" });
        }
    });
}

function obtenerDetallesFacturas(req, res) {
    DetalleFacturaModel.getDetallesFacturas(function (error, data) {
        res.status(200).json(data);
    });
}

function obtenerDetalleFactura(req, res) {
    var id = req.params.id;
    //Revisar si el id es valido
    if (!isNaN(id)) {
        DetalleFacturaModel.getDetalleFactura(id, function (error, data) {
            //si la factura existe mostrar en formato json
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
function actualizarDetalleFactura(req, res) {
    var DetalleFacturaData =
    {
        id_detalle_fact: req.body.id_detalle_fact,
        factura: req.body.factura,
        producto: req.body.producto,
    };

    DetalleFacturaModel.updateDetalleFactura(DetalleFacturaData, function (error, data) {
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

function eliminarDetalleFactura(req, res) {
    var DetalleFacturaData =
    {
        id_detalle_fact: req.body.id_detalle_fact,
        factura: req.body.factura,
        producto: req.body.producto,
    };

    DetalleFacturaModel.deleteDetalleFactura(DetalleFacturaData, function (error, data) {
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
    insertarDetalleFactura,
    obtenerDetallesFacturas,
    obtenerDetalleFactura,
    actualizarDetalleFactura,
    eliminarDetalleFactura
}