var connection = require('../config/index')
var TipoDocModel = {};

//Obtener todos los tipos de documento
TipoDocModel.getTiposDoc = function (callback) {
    var sql = "SELECT `id_tipo_doc`, `tipo_doc` FROM `tipos_doc` ORDER BY `id_tipo_doc` DESC;";
    connection.query(sql, function (error, rows) {
        if (error) {
            throw error;
        } else {
            callback(null, rows);
        }
    });
}

//Obtener un tipo identificacion por su id
TipoDocModel.getTipoDoc = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_tipo_doc`, `tipo_doc` FROM `tipos_doc` WHERE id_tipo_doc = " +
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

//Añadir un nuevo tipo de documento
TipoDocModel.insertTipoDoc = function (TipoDocData, callback) {
    if (connection) {
        var sql = "INSERT INTO tipos_doc SET ?";

        connection.query(sql, TipoDocData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

//Actualizar un tipo de documento
TipoDocModel.updateTipoDoc = function (TipoDocData, callback) {
    if (connection) {
        var sql = "UPDATE tipos_doc SET tipo_doc = " + connection.escape(TipoDocData.tipo_doc) +
            " WHERE id_tipo_doc = " + connection.escape(TipoDocData.id_tipo_doc) + ";";

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

//Eliminar un tipo de documento
TipoDocModel.deleteTipoDoc = function (TipoDocData, callback) {
    if (connection) {
        var sql = "DELETE tipos_doc FROM tipos_doc WHERE id_tipo_doc = " + connection.escape(TipoDocData.id_tipo_doc) + ";";

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
module.exports = TipoDocModel;