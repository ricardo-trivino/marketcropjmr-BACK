var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

module.exports = function (req, res, next) {
    if (req.path != '/producto') {
        //Si la ruta no es login
        if (req.path != '/auth/login') {
            //Si la ruta tampoco es registro
            if (req.path != '/registro/registrarse') {
                //Si la ruta no es tipos doc
                if (req.path != '/tipodoc') {
                    if (req.headers.authorization) {
                        var token = req.headers.authorization.split(' ')[1];
                        jwt.verify(token, 'secretkey', function (error, decoded) {
                            if (error) return res.status(403).send({ message: 'No tiene permisos para acceder', error });
                            var rol = decoded.user[0].rol_us;
                            if (req.path != '/usuario' && rol == 2) {
                                res.json({
                                    "rol": rol
                                });
                            } else {
                                next();
                            }
                            //validar si el rol es cliente o admin
                            /*if (rol == 1) {
                                //El usuario es cliente
                                res.json({
                                    "rol": rol
                                });
                            }
                            else {
                                //El usuario es admin
                                res.json({
                                    "rol": rol
                                });
                            }*/
                        });
                    } else res.json({ "mensaje": "No tiene permisos para acceder" });
                }
                //Todos pueden ver tipos doc
                else if (req.method == 'GET') {
                    next();
                }
                else {
                    res.json({ "mensaje": "No tiene permisos para acceder" });
                }
            }
            //Todos los usuarios pueden acceder al registro
            else next();
        }
        //Todos los usuarios pueden acceder al login
        else next();
    }
    //Todos pueden ver los productos
    else if (req.method == 'GET') {
        next();
    }
    else {
        res.json({ "mensaje": "No tiene permisos para acceder" });
    }
}