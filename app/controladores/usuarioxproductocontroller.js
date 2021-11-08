var UsuarioXProductoModel = require('../modelos/usuarioxproductomodel');

function insertarUsuarioXProducto(req, res) {
    //creamos un objeto Json con los datos del rol con la estructura del insert
    //INSERT INTO `usuarios_x_productos`(`id_us_x_prod`, `usuario`, `producto`) VALUES ('[value-1]','[value-2]','[value-3]')
    var UsuarioXProductoData =
    {
        id_us_x_prod: null,
        usuario: req.body.usuario,
        producto: req.body.producto,
        cantidad: req.body.cantidad,
        fecha_compra: req.body.fecha_compra,
    };
    UsuarioXProductoModel.insertUsuarioXProducto(UsuarioXProductoData, function (error, data) {
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(500).send({ error: "sad :(" });
        }
    });
}

function obtenerUsuariosXProductos(req, res) {
    UsuarioXProductoModel.getUsuariosXProductos(function (error, data) {
        res.status(200).json(data);
    });
}

function obtenerUsuarioXProducto(req, res) {
    var id = req.params.id;
    //Revisar si el id es valido
    if (!isNaN(id)) {
        UsuarioXProductoModel.getUsuarioXProducto(id, function (error, data) {
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
function actualizarUsuarioXProducto(req, res) {
    var UsuarioXProductoData =
    {
        id_us_x_prod: req.body.id_us_x_prod,
        usuario: req.body.usuario,
        producto: req.body.producto,
        cantidad: req.body.cantidad,
        fecha_compra: req.body.fecha_compra,
    };

    UsuarioXProductoModel.updateUsuarioXProducto(UsuarioXProductoData, function (error, data) {
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

function eliminarUsuarioXProducto(req, res) {
    var UsuarioXProductoData =
    {
        id_us_x_prod: req.body.id_us_x_prod,
        usuario: req.body.usuario,
        producto: req.body.producto,
        cantidad: req.body.cantidad,
        fecha_compra: req.body.fecha_compra,
    };

    UsuarioXProductoModel.deleteUsuarioXProducto(UsuarioXProductoData, function (error, data) {
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
    insertarUsuarioXProducto,
    obtenerUsuariosXProductos,
    obtenerUsuarioXProducto,
    actualizarUsuarioXProducto,
    eliminarUsuarioXProducto
}