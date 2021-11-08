var FacturaModel = require('../modelos/facturamodel');

function insertarFactura(req, res) {
    //creamos un objeto Json con los datos del rol con la estructura del insert
    //INSERT INTO `facturas`(`id_factura`, `cliente_factura`, `fecha_factura`) VALUES ('[value-1]','[value-2]','[value-3]')
    var FacturaData =
    {
        id_factura: null,
        cliente_factura: req.body.cliente_factura,
        fecha_factura: req.body.fecha_factura,
    };
    FacturaModel.insertFactura(FacturaData, function (error, data) {
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).send({ error: "sad :(" });
        }
    });
}

function obtenerFacturas(req, res) {
    FacturaModel.getFacturas(function (error, data) {
        res.status(200).json(data);
    });
}

function obtenerFactura(req, res) {
    var id = req.params.id;
    //Revisar si el id es valido
    if (!isNaN(id)) {
        FacturaModel.getFactura(id, function (error, data) {
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
function actualizarFactura(req, res) {
    var FacturaData =
    {
        id_factura: req.body.id_factura,
        cliente_factura: req.body.cliente_factura,
        fecha_factura: req.body.fecha_factura,
    };

    FacturaModel.updateFactura(FacturaData, function (error, data) {
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

function eliminarFactura(req, res) {
    var FacturaData =
    {
        id_factura: req.body.id_factura,
        cliente_factura: req.body.cliente_factura,
        fecha_factura: req.body.fecha_factura,
    };

    FacturaModel.deleteFactura(FacturaData, function (error, data) {
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
    insertarFactura,
    obtenerFacturas,
    obtenerFactura,
    actualizarFactura,
    eliminarFactura
}