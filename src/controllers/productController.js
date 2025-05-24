const Product = require("../models/productModel");

const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAll(); // Llamamos al modelo para obtener todos los productos
            res.status(200).json(products); // Respondemos con los productos en formato JSON
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos', error }); // Manejo de errores
        }
    }, // Obtener un producto por su ID
    getProductById: async (req, res) => {
        const { id } = req.params; // Obtenemos el ID de los parámetros de la ruta
        try {
            const product = await Product.findById(id); // Llamamos al modelo para obtener el producto por ID
            if (product.length === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' }); // Si no se encuentra, respondemos con 404
            }
            res.status(200).json(product[0]); // Respondemos con el producto encontrado
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el producto', error }); // Manejo de errores
        }
    },
     // Crear un nuevo producto
    createProduct: async (req, res) => {
        const { name, description, price, category_id } = req.body; // Obtenemos los datos del cuerpo de la solicitud
        const image_url = req.file ? `/uploads/${req.file.filename}` : ''; // Obtenemos la URL de la imagen

        if (!name || !description || !price || !category_id) {
            return res.status(400).json({ message: 'Nombre, descripción, precio y categoría son obligatorios' }); // Validación de datos
        }

        try {
            const newProduct = await Product.create(name, description, price, category_id, image_url); // Llamamos al modelo para crear el producto
            res.status(201).json({ message: 'Producto creado exitosamente', newProduct }); // Respondemos con éxito
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el producto', error }); // Manejo de errores
        }
    },
        // Actualizar un producto
    updateProduct: async (req, res) => {
        const { id } = req.params; // Obtenemos el ID de la categoría de los parámetros de la ruta
        const { name, description, price, category_id } = req.body; // Obtenemos los datos del cuerpo de la solicitud
        const image_url = req.file ? `/uploads/${req.file.filename}` : ''; // Obtenemos la URL de la imagen

        if (!name || !description || !price || !category_id) {
            return res.status(400).json({ message: 'Nombre, descripción, precio y categoría son obligatorios' }); // Validación de datos
        }

        try {
            const updatedProduct = await Product.update(id, name, description, price, category_id, image_url); // Llamamos al modelo para actualizar el producto
            if (updatedProduct.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' }); // Si no se encuentra, respondemos con 404
            }
            res.status(200).json({ message: 'Producto actualizado exitosamente', updatedProduct }); // Respondemos con éxito
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el producto', error }); // Manejo de errores
        }
    },
     // Eliminar un producto
    deleteProduct: async (req, res) => {
        const { id } = req.params; // Obtenemos el ID de los parámetros de la ruta
        try {
            const deletedProduct = await Product.delete(id); // Llamamos al modelo para eliminar el producto
            if (deletedProduct.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado' }); // Si no se encuentra, respondemos con 404
            }
            res.status(200).json({ message: 'Producto eliminado exitosamente' }); // Respondemos con éxito
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el producto', error }); // Manejo de errores
        }
    }

}

module.exports = ProductController;