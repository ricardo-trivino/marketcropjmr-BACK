var connection = require('../config/index');
var bcrypt = require('bcrypt');
var saltRounds = 5;
var UsuarioModel = {};

//Obtener todos los usuarios
UsuarioModel.getUsuarios = function (callback) {
    var sql = "SELECT `id_usuario`, `tipo_doc_us`, `num_doc_us`, `pnombre_us`, `snombre_us`, `papellido_us`, `sapellido_us`, `contrasena_us`, `nickname_us`, `rol_us`, `estado_us` FROM `usuarios` WHERE `estado_us` = 'A' ORDER BY `id_usuario` DESC;";
    connection.query(sql, function (error, rows) {
        if (error) {
            throw error;
        } else {
            callback(null, rows);
        }
    });
}

//Obtener un usuario por su id
UsuarioModel.getUsuario = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_usuario`, `tipo_doc_us`, `num_doc_us`, `pnombre_us`, `snombre_us`, `papellido_us`, `sapellido_us`, `contrasena_us`, `nickname_us`, `rol_us`, `estado_us` FROM `usuarios` WHERE id_usuario = " +
            connection.escape(id) + " AND `estado_us` = 'A';";

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

//obtener un usuario por su nickname único
UsuarioModel.getUsuarioByNick = async function (nickname_us, callback) {
    if (connection) {
        var sql = "SELECT `nickname_us`,`rol_us`  FROM `usuarios` WHERE nickname_us = " +
            connection.escape(nickname_us) + ";";

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

//obtener una cedula por su nickname único
UsuarioModel.getUsuarioCedula = async function (num_doc_us, callback) {
    if (connection) {
        var sql = "SELECT `num_doc_us`  FROM `usuarios` WHERE num_doc_us = " +
            connection.escape(num_doc_us) + ";";

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

UsuarioModel.getPassUsuario = async function (nickname_us, callback) {
    if (connection) {
        var sql = "SELECT `contrasena_us` FROM `usuarios` WHERE nickname_us = " +
            connection.escape(nickname_us) + ";";

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

UsuarioModel.getEstadoUsuario = async function (nickname_us, callback) {
    if (connection) {
        var sql = "SELECT `estado_us` FROM `usuarios` WHERE nickname_us = " +
            connection.escape(nickname_us) + ";";

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

//Añadir un nuevo usuario
UsuarioModel.insertUsuario = async function (UsuarioData, callback) {
    if (connection) {
        //hash con salt=10
        passwordhash = await bcrypt.hash(UsuarioData.contrasena_us, saltRounds)
        //almacenar contraseña con hash en la DB
        UsuarioData.contrasena_us = passwordhash;
        var sql = "INSERT INTO usuarios SET ?";

        connection.query(sql, UsuarioData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

UsuarioModel.insertCliente = async function (UsuarioData, callback) {
    if (connection) {
        //hash con salt=10
        passwordhash = await bcrypt.hash(UsuarioData.contrasena_us, saltRounds)
        //almacenar contraseña con hash en la DB
        UsuarioData.contrasena_us = passwordhash;
        var sql = "INSERT INTO usuarios SET ?";

        connection.query(sql, UsuarioData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

//Actualizar un usuario
UsuarioModel.updateUsuario = async function (UsuarioData, callback) {
    if (connection) {
        //hash con salt=10
        passwordhash = await bcrypt.hash(UsuarioData.contrasena_us, saltRounds)
        //almacenar contraseña con hash en la DB
        UsuarioData.contrasena_us = passwordhash;
        var sql = "UPDATE usuarios SET tipo_doc_us = " + connection.escape(UsuarioData.tipo_doc_us) +
            ", num_doc_us = " + connection.escape(UsuarioData.num_doc_us) +
            ", pnombre_us = " + connection.escape(UsuarioData.pnombre_us) +
            ", snombre_us = " + connection.escape(UsuarioData.snombre_us) +
            ", papellido_us = " + connection.escape(UsuarioData.papellido_us) +
            ", sapellido_us = " + connection.escape(UsuarioData.sapellido_us) +
            ", contrasena_us = " + connection.escape(UsuarioData.contrasena_us) +
            ", nickname_us = " + connection.escape(UsuarioData.nickname_us) +
            ", rol_us = " + connection.escape(UsuarioData.rol_us) +
            ", estado_us = " + connection.escape(UsuarioData.estado_us) +
            " WHERE id_usuario = " + connection.escape(UsuarioData.id_usuario) + ";";

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

//Desactivar un usuario
UsuarioModel.deactivateUsuario = function (id, callback) {
    if (connection) {
        var sql = "UPDATE usuarios set estado_us = 'I' WHERE id_usuario = " + connection.escape(id) + ";";

        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else if (result.affectedRows > 0) {
                callback(null, { "msg": "Usuario Desactivado, para activar solo inicie sesión" });
            }
            else {
                callback(null, { "msg": "Registro no Existe" });
            }
        });
    }
}

//Activar un usuario
UsuarioModel.activateUsuario = function (nickname_us, callback) {
    if (connection) {
        var sql = "UPDATE usuarios set estado_us = 'A' WHERE nickname_us = " + connection.escape(nickname_us) + ";";

        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else if (result.affectedRows > 0) {
                callback(null, { "msg": "Usuario Activo de nuevo" });
            }
            else {
                callback(null, { "msg": "Registro no Existe" });
            }
        });
    }
}

//Exportar el objeto para tenerlo disponible en el controlador
module.exports = UsuarioModel;