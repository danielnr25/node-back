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

    }


}

module.exports = CategoryController