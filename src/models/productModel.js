const database = require('../config/db')

const Product = {
    getAll: async () => {
        try {
            const [results] = await database.query("SELECT pr.nombre,pr.id,pr.precio,pr.descripcion,pr.imagen,cp.nombre as categorianombre FROM `productos` pr LEFT JOIN categorias_productos cp ON pr.categoria_id = cp.id WHERE pr.deleted_at IS NULL"); // Traemos todos los productos donde deleted_at es NULL
            return results;
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    },
    findById: async (id) => {
        try {
            const [results] = await database.query("SELECT pr.nombre,pr.id,pr.precio,pr.descripcion,pr.imagen,cp.nombre as categorianombre FROM `productos` pr LEFT JOIN categorias_productos cp ON pr.categoria_id = cp.id WHERE pr.id = ? AND pr.deleted_at IS NULL", [id]); // Traemos el producto por su ID
            return results;
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    },
    // Crear un nuevo producto
    create: async (name, description, price, category_id, image_url) => {
        try {
            const [results] = await database.query("INSERT INTO productos(nombre, precio, descripcion,imagen, categoria_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
                [name,price,description,image_url,category_id] // Se almacena la URL de la imagen
            );
            return results; // Retorna los resultados de la inserción
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    },
    update: async (id, name, description, price, category_id, image_url) => {
        try {
            const [results] = await database.query("UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, imagen = ?,categoria_id = ?, updated_at = NOW() WHERE id = ?",
                [name, price, description,image_url,category_id,id]
            );
            
            return results; // Retorna los resultados de la actualización
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    },
    delete: async (id) => {
        try {
            const [results] = await database.query("UPDATE productos SET deleted_at = NOW() WHERE id = ?", [id]);
            return results; // Retorna los resultados de la eliminación
        } catch (error) {
            throw error; // Si hay un error lo lanzamos
        }
    }

}

module.exports = Product;