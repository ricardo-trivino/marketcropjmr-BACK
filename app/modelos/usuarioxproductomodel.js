var connection = require('../config/index')
var UsuarioXProductoModel = {};

//Obtener todos los usuariosxproductos
UsuarioXProductoModel.getUsuariosXProductos = function (callback) {
    var sql = "SELECT `id_us_x_prod`, `usuario`, `producto` FROM `usuarios_x_productos` ORDER BY `id_us_x_prod` DESC;";
    connection.query(sql, function (error, rows) {
        if (error) {
            throw error;
        } else {
            callback(null, rows);
        }
    });
}

//Obtener usuarioxproducto por su id
UsuarioXProductoModel.getUsuarioXProducto = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_us_x_prod`, `usuario`, `producto` FROM `usuarios_x_productos` WHERE id_us_x_prod = " +
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

//Añadir un nuevo usuarioxproducto
UsuarioXProductoModel.insertUsuarioXProducto = function (UsuarioXProductoData, callback) {
    if (connection) {
        var sql = "INSERT INTO usuarios_x_productos SET ?";

        connection.query(sql, UsuarioXProductoData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

//Actualizar un usuarioxproducto
UsuarioXProductoModel.updateUsuarioXProducto = function (UsuarioXProductoData, callback) {
    if (connection) {
        var sql = "UPDATE usuarios_x_productos SET usuario = " + connection.escape(UsuarioXProductoData.usuario) +
            ", producto = " + connection.escape(UsuarioXProductoData.producto) +
            " WHERE id_us_x_prod = " + connection.escape(UsuarioXProductoData.id_us_x_prod) + ";";

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

//Eliminar un usuarioxproducto
UsuarioXProductoModel.deleteUsuarioXProducto = function (UsuarioXProductoData, callback) {
    if (connection) {
        var sql = "DELETE usuarios_x_productos FROM usuarios_x_productos WHERE id_us_x_prod = " + connection.escape(UsuarioXProductoData.id_us_x_prod) + ";";

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
module.exports = UsuarioXProductoModel;