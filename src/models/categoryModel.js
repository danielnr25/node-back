const database = require('../config/db');


const Category = {
    //Obtener todas las categorias
    getAll: async() =>{
        try {
            const [results] = await database.query("SELECT id,nombre,descripcion FROM categorias_productos WHERE deleted_at IS NULL");
            return results;
        } catch (error) {
            throw error; // Si hay un error que nos muestre para poder verificarlo
        }
    },
    //Crear categorias
    create: async(name, description) =>{
        try {
            const [results] = await database.query("INSERT INTO categorias_productos (nombre,descripcion,created_at,updated_at) VALUES (?, ?,NOW(),NOW())",[name,description]);
            return results;
        } catch (error) {
            throw error;
        }
    }

}


module.exports = Category; // Exportacion del Modelo Category para usar en los diferentes archivos del proyecto