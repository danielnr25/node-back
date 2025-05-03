const database = require('../config/db');
//SELECT id,username,password, tipo_usuario_id FROM usuarios WHERE username = 'admin' AND deleted_at IS NULL

const User = {
    findByUsername: async(username) =>{ // Buscamos un usuario por nombre en la tabla usuarios
        try {
            const [results] = await database.query("SELECT id,username,password, tipo_usuario_id FROM usuarios WHERE username = ? AND deleted_at IS NULL",[username]);
            return results; // al ejecutar la consulta nos devuelve los resultados en un objeto.
        } catch (error) {
            throw error; // si en caso algo falla nos muestra el error.
        }
    }
}


module.exports = User;