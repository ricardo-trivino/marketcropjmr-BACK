var connection = require('../config/index')
var ProductoModel = {};

//Obtener todos los productos
ProductoModel.getProductos = function (callback) {
    var sql = "SELECT `id_prod`, `nombre_prod`, `precio_prod`, `stock_prod` FROM `productos` WHERE `stock_prod` > 0 ORDER BY `id_prod` DESC;";
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
            connection.escape(id) + " AND `stock_prod` > 0;";

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

//Obtener un producto por su nombre
ProductoModel.getProductoByName = async function (nombre_prod, callback) {
    if (connection) {
        var sql = "SELECT `nombre_prod`  FROM `productos` WHERE nombre_prod = " +
            connection.escape(nombre_prod) + ";";

        await connection.query(sql, function (error, row) {
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

//Sumar stock de un producto
ProductoModel.sumarStock = function (id, stock, callback) {
    if (connection) {
        var sql = "UPDATE productos set stock_prod = stock_prod + " + connection.escape(stock) + " WHERE id_prod = " + connection.escape(id) + ";";

        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else if (result.affectedRows > 0) {
                callback(null, { "msg": "Este producto ya existe, se agregó la cantidad al stock" });
            }
            else {
                callback(null, { "msg": "Registro no Existe" });
            }
        });
    }
}

//Exportar el objeto para tenerlo disponible en el controlador
module.exports = ProductoModel;