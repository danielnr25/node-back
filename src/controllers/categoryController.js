const Category = require("../models/categoryModel");

const CategoryController = {
    getAllCategories: async(req,res) =>{
        try {
            const categories = await Category.getAll(); //Llamado al modelo para obtener todas las categorias
            res.status(200).json(categories); // envio en un formato las categorias
        } catch (error) {
            res.status(500).json({message:"Error al obtener las categorias",error});
        }
    },
    getCategoryById: async(req,res) =>{
        const {id} = req.params; // Obtener el id de los parámetros de la ruta
        try {
            const category = await Category.findById(id); // llamando al modelo para obtener la categoria por ID
            if(category.length ===0){
                return res.status(404).json({message:"Categoria no encontrada"}); // si no se encuentra el id en base de datos
            }
            res.status(200).json(category[0]); // el id  encontrado
        } catch (error) {
            res.status(500).json({message:"Error al obtner la categoria",error});
        }
    },
    createCategory:async(req,res) =>{
        const {name,description} = req.body; // Obtenemos los datos del cuerpo de la solicitud
        // Validaciones
        if(!name || !description){
            return res.status(400).json({message:"Nombre y Descripción son obligatorios"});
        }

        try {
            const newCategory = await Category.create(name, description); // Llamamos al modelo para crear la categoría
            res.status(201).json({ message: 'Categoría creada exitosamente', newCategory }); // Respondemos con éxito
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la categoría', error }); // Manejo de errores
        }
    },
    updateCategory: async (req, res) => {
        const { id } = req.params; // Obtenemos el ID de la categoría de los parámetros de la ruta
        const { name, description } = req.body; // Obtenemos los datos del cuerpo de la solicitud
        if (!name || !description) {
            return res.status(400).json({ message: 'Nombre y descripción son obligatorios' }); // Validación de datos
        }
        try {
            const updatedCategory = await Category.update(id, name, description); // Llamamos al modelo para actualizar la categoría
            if (updatedCategory.affectedRows === 0) {
                return res.status(404).json({ message: 'Categoría no encontrada' }); // Si no se encuentra, respondemos con 404
            }
            res.status(200).json({ message: 'Categoría actualizada exitosamente', updatedCategory }); // Respondemos con éxito
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la categoría', error }); // Manejo de errores
        }
    },
    deleteCategory: async (req, res) => {
        const { id } = req.params; // Obtenemos el ID de la categoría de los parámetros de la ruta
        try {
            const deletedCategory = await Category.delete(id); // Llamamos al modelo para eliminar la categoría
            if (deletedCategory.affectedRows === 0) {
                return res.status(404).json({ message: 'Categoría no encontrada' }); // Si no se encuentra, respondemos con 404
            }
            res.status(200).json({ message: 'Categoría eliminada exitosamente' }); // Respondemos con éxito
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la categoría', error }); // Manejo de errores
        }
    }
}

module.exports = CategoryController