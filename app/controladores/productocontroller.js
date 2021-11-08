var ProductoModel = require('../modelos/productomodel');

function insertarProducto(req, res) {
    //creamos un objeto Json con los datos del rol con la estructura del insert
    //INSERT INTO `productos`(`id_prod`, `nombre_prod`, `precio_prod`, `stock_prod`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]')
    var ProductoData =
    {
        id_prod: null,
        nombre_prod: req.body.nombre_prod,
        precio_prod: req.body.precio_prod,
        stock_prod: req.body.stock_prod,
    };
    ProductoModel.getProductoByName(ProductoData.nombre_prod, function (error, data) {
        //si el producto existe
        if (typeof data !== 'undefined' && data.length > 0) {
            //Sumar la cantidad al stock
            ProductoModel.sumarStock(ProductoData.id_prod, ProductoData.stock_prod, function (error, data) {
                //si el producto existe mostrar mensaje de stock agregado
                if (data && data.msg) {
                    res.status(200).json(data);
                }
                //si el producto no existe mostrar error
                else {
                    res.status(500).send({
                        error: "sad :("
                    });
                }
            });
        }
        //el producto no existe aún
        else {
            ProductoModel.insertProducto(ProductoData, function (error, data) {
                if (data) {
                    res.status(200).json(data);
                }
                else {
                    res.status(500).send({ error: "sad :(" });
                }
            });
        }
    })
}

function obtenerProductos(req, res) {
    ProductoModel.getProductos(function (error, data) {
        res.status(200).json(data);
    });
}

function obtenerProducto(req, res) {
    var id = req.params.id;
    //Revisar si el id es valido
    if (!isNaN(id)) {
        ProductoModel.getProducto(id, function (error, data) {
            //si el producto existe mostrar en formato json
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
function actualizarProducto(req, res) {
    var ProductoData =
    {
        id_prod: req.body.id_prod,
        nombre_prod: req.body.nombre_prod,
        precio_prod: req.body.precio_prod,
        stock_prod: req.body.stock_prod,
    };

    ProductoModel.updateProducto(ProductoData, function (error, data) {
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

function eliminarProducto(req, res) {
    var ProductoData =
    {
        id_prod: req.body.id_prod,
        nombre_prod: req.body.nombre_prod,
        precio_prod: req.body.precio_prod,
        stock_prod: req.body.stock_prod,
    };

    ProductoModel.deleteProducto(ProductoData, function (error, data) {
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
    insertarProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}