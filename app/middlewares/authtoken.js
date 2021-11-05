var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.path != '/auth/login') {
        if(req.headers.authorization) {
            var token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, 'secretkey', function(error, decoded){
                if(error) return res.status(403).send({message: 'No tiene permisos para acceder', error});
                console.log(decoded);
                next();
            });
        }else res.status(403).send({message: 'No tiene permisos para acceder'})
    }
    else next();
}