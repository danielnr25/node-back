const database = require('../config/db');

const Category = {
   //Obtener todas las categorias
   getAll: async () => {
      try {
         const [results] = await database.query("SELECT id,nombre,descripcion FROM categorias_productos WHERE deleted_at IS NULL");
         return results;
      } catch (error) {
         throw error; // Si hay un error que nos muestre para poder verificarlo
      }
   },
   // Obtener categoria por ID
   findById: async (id) => {
      try {
         const [results] = await database.query("SELECT id,nombre,descripcion FROM categorias_productos WHERE id = ? AND deleted_at IS NULL", [id]);
         return results;
      } catch (error) {
         throw error;
      }
   },

   //Crear categorias
   create: async (name, description) => {
      try {
         const [results] = await database.query("INSERT INTO categorias_productos (nombre,descripcion,created_at,updated_at) VALUES (?, ?,NOW(),NOW())", [name, description]);
         return results;
      } catch (error) {
         throw error;
      }
   },
   // ACTUALIZAR CATEGORIA
   update: async (id, name, description) => {
      try {
         const [results] = await database.query("UPDATE categorias_productos SET nombre = ?, descripcion = ?, updated_at = NOW() WHERE id = ?", [name, description, id]);
         return results;
      } catch (error) {
         throw error;
      }
   },
   //Eliminar categoria
   delete: async (id) => {
      try {
         const [results] = await database.query("UPDATE categorias_productos SET deleted_at = NOW() WHERE id = ?", [id]);
         return results;
      } catch (error) {
         throw error;
      }
   },
   search: async (name) => {
      try {
         const [results] = await database.query("SELECT id,nombre,descripcion FROM `categorias_productos` WHERE nombre LIKE ? AND deleted_at IS NULL", [`%${name}%`]);
         return results;
      } catch (error) {
         throw error;
      }
   }
}


module.exports = Category; // Exportacion del Modelo Category para usar en los diferentes archivos del proyecto