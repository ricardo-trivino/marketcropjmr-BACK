var connection = require('../config/index')
var DatoUsuarioModel = {};

//Obtener todos los datos_usuario
DatoUsuarioModel.getDatosUsuario = function (callback) {
    var sql = "SELECT `id_dato_us`, `usuario`, `dato_us_clave`, `dato_us_valor` FROM `datos_usuario` du INNER JOIN usuarios u ON u.id_usuario = du.usuario WHERE u.estado_us = 'A' ORDER BY `id_dato_us` DESC;";
    connection.query(sql, function (error, rows) {
        if (error) {
            throw error;
        } else {
            callback(null, rows);
        }
    });
}

//Obtener un dato_usuario por su id
DatoUsuarioModel.getDatoUsuario = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_dato_us`, `usuario`, `dato_us_clave`, `dato_us_valor` FROM `datos_usuario` du INNER JOIN usuarios u ON u.id_usuario = du.usuario WHERE id_dato_us = " +
            connection.escape(id) + " AND u.estado_us = 'A';";

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

//Añadir un nuevo dato_usuario
DatoUsuarioModel.insertDatoUsuario = function (DatoUsuarioData, callback) {
    if (connection) {
        var sql = "INSERT INTO datos_usuario SET ?";

        connection.query(sql, DatoUsuarioData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

//Actualizar un dato_usuario
DatoUsuarioModel.updateDatoUsuario = function (DatoUsuarioData, callback) {
    if (connection) {
        var sql = "UPDATE datos_usuario SET usuario = " + connection.escape(DatoUsuarioData.usuario) +
            ", dato_us_clave = " + connection.escape(DatoUsuarioData.dato_us_clave) +
            ", dato_us_valor = " + connection.escape(DatoUsuarioData.dato_us_valor) +
            " WHERE id_dato_us = " + connection.escape(DatoUsuarioData.id_dato_us) + ";";

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

//Eliminar un dato_usuario
DatoUsuarioModel.deleteDatoUsuario = function (DatoUsuarioData, callback) {
    if (connection) {
        var sql = "DELETE datos_usuario FROM datos_usuario WHERE id_dato_us = " + connection.escape(DatoUsuarioData.id_dato_us) + ";";

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
module.exports = DatoUsuarioModel;