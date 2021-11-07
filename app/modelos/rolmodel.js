var connection = require('../config/index')
var RolModel = {};

//Obtener todos los roles
RolModel.getRoles = function (callback) {
    var sql = "SELECT `id_rol`, `rol` FROM `roles` ORDER BY `id_rol` DESC;";
    connection.query(sql, function (error, rows) {
        if (error) {
            throw error;
        } else {
            callback(null, rows);
        }
    });
}

//Obtener un rol por su id
RolModel.getRol = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_rol`, `rol` FROM `roles` WHERE id_rol = " +
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

//Añadir un nuevo rol
RolModel.insertRol = function (RolData, callback) {
    if (connection) {
        var sql = "INSERT INTO roles SET ?";

        connection.query(sql, RolData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

//Actualizar un rol
RolModel.updateRol = function (RolData, callback) {
    if (connection) {
        var sql = "UPDATE roles SET rol = " + connection.escape(RolData.rol) +
            " WHERE id_rol = " + connection.escape(RolData.id_rol) + ";";

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

//Eliminar un rol
RolModel.deleteRol = function (RolData, callback) {
    if (connection) {
        var sql = "DELETE roles FROM roles WHERE id_rol = " + connection.escape(RolData.id_rol) + ";";

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
module.exports = RolModel;