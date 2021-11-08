var connection = require('../config/index')
var DetalleFacturaModel = {};

//Obtener todos los detalles_facturas
DetalleFacturaModel.getDetallesFacturas = function (callback) {
    var sql = "SELECT `id_detalle_fact`, `factura`, `producto` FROM `detalle_factura` ORDER BY `id_detalle_fact` DESC;";
    connection.query(sql, function (error, rows) {
        if (error) {
            throw error;
        } else {
            callback(null, rows);
        }
    });
}

//Obtener un detalle_factura por su id
DetalleFacturaModel.getDetalleFactura = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_detalle_fact`, `factura`, `producto` FROM `detalle_factura` WHERE id_detalle_fact = " +
            connection.escape(id) + ";";

        connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}

//Añadir un nuevo detalle_factura
DetalleFacturaModel.insertDetalleFactura = function (DetalleFacturaData, callback) {
    if (connection) {
        var sql = "INSERT INTO detalle_factura SET ?";

        connection.query(sql, DetalleFacturaData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

//Actualizar un detalle_factura
DetalleFacturaModel.updateDetalleFactura = function (DetalleFacturaData, callback) {
    if (connection) {
        var sql = "UPDATE detalle_factura SET factura = " + connection.escape(DetalleFacturaData.factura) +
            ", producto = " + connection.escape(DetalleFacturaData.producto) +
            " WHERE id_detalle_fact = " + connection.escape(DetalleFacturaData.id_detalle_fact) + ";";

        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else if (result.affectedRows > 0) {
                callback(null, { "msg": "Registro Actualizado" });
            }
            else {
                callback(null, { "msg": "Registro no Existe" });
            }
        });
    }
}

//Eliminar un detalle_factura
DetalleFacturaModel.deleteDetalleFactura = function (DetalleFacturaData, callback) {
    if (connection) {
        var sql = "DELETE detalle_factura FROM detalle_factura WHERE id_detalle_fact = " + connection.escape(DetalleFacturaData.id_detalle_fact) + ";";

        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else if (result.affectedRows > 0) {
                callback(null, { "msg": "Registro Eliminado" })
            }
            else {
                callback(null, { "msg": "Registro no Existe" })
            }
        });
    }
}

//Exportar el objeto para tenerlo disponible en el controlador
module.exports = DetalleFacturaModel;