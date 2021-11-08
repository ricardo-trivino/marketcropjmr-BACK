var connection = require('../config/index')
var FacturaModel = {};

//Obtener todas las facturas
FacturaModel.getFacturas = function (callback) {
    var sql = "SELECT `id_factura`, `cliente_factura`, `fecha_factura` FROM `facturas` ORDER BY `id_factura` DESC;";
    connection.query(sql, function (error, rows) {
        if (error) {
            throw error;
        } else {
            callback(null, rows);
        }
    });
}

//Obtener una factura por su id
FacturaModel.getFactura = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_factura`, `cliente_factura`, `fecha_factura` FROM `facturas` WHERE id_factura = " +
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

//Añadir una nueva factura
FacturaModel.insertFactura = function (FacturaData, callback) {
    if (connection) {
        var sql = "INSERT INTO facturas SET ?";

        connection.query(sql, FacturaData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

//Actualizar una factura
FacturaModel.updateFactura = function (FacturaData, callback) {
    if (connection) {
        var sql = "UPDATE facturas SET cliente_factura = " + connection.escape(FacturaData.cliente_factura) +
            ", fecha_factura = " + connection.escape(FacturaData.fecha_factura) +
            " WHERE id_factura = " + connection.escape(FacturaData.id_factura) + ";";

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

//Eliminar una factura
FacturaModel.deleteFactura = function (FacturaData, callback) {
    if (connection) {
        var sql = "DELETE facturas FROM facturas WHERE id_factura = " + connection.escape(FacturaData.id_factura) + ";";

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
module.exports = FacturaModel;