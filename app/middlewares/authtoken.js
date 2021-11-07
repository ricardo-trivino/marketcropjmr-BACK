var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //Si la ruta no es login
    if (req.path != '/auth/login') {
        if (req.headers.authorization) {
            var token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secretkey', function (error, decoded) {
                if (error) return res.status(403).send({ message: 'No tiene permisos para acceder', error });
                var rol = decoded.user[0].rol_us;
                //validar si el rol es cliente o admin
                if (rol == 1) {
                    //El usuario es cliente
                    res.json(rol);
                }
                else {
                    //El usuario es admin
                    next();//dejar ingresar al usuario
                }
            });
        } else res.status(403).send({ message: 'No tiene permisos para acceder' });
    }
    //Todos los usuarios pueden acceder al login
    else next();
}