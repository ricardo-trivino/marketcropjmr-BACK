var connection = require('../config/index')
var ProductoModel = {};

//Obtener todos los productos
ProductoModel.getProductos = function (callback) {
    var sql = "SELECT `id_prod`, `nombre_prod`, `precio_prod`, `stock_prod` FROM `productos` ORDER BY `id_prod` DESC;";
    connection.query(sql, function (error, rows) {
        if (error) {
            throw error;
        } else {
            callback(null, rows);
        }
    });
}

//Obtener un producto por su id
ProductoModel.getProducto = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_prod`, `nombre_prod`, `precio_prod`, `stock_prod` FROM `productos` WHERE id_prod = " +
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

//Añadir un nuevo producto
ProductoModel.insertProducto = function (ProductoData, callback) {
    if (connection) {
        var sql = "INSERT INTO productos SET ?";

        connection.query(sql, ProductoData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

//Actualizar un producto
ProductoModel.updateProducto = function (ProductoData, callback) {
    if (connection) {
        var sql = "UPDATE productos SET nombre_prod = " + connection.escape(ProductoData.nombre_prod) +
            ", precio_prod = " + connection.escape(ProductoData.precio_prod) +
            ", stock_prod = " + connection.escape(ProductoData.stock_prod) +
            " WHERE id_prod = " + connection.escape(ProductoData.id_prod) + ";";

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

//Eliminar un producto
ProductoModel.deleteProducto = function (ProductoData, callback) {
    if (connection) {
        var sql = "DELETE productos FROM productos WHERE id_prod = " + connection.escape(ProductoData.id_prod) + ";";

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
module.exports = ProductoModel;