const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

//OBTENER TODAS LAS CATEGORIAS
router.get('/',CategoryController.getAllCategories);

// Obtener una categoria por su ID
router.get('/:id',CategoryController.getCategoryById);

// Crear una nueva categoria
router.post('/',CategoryController.createCategory);

// Editar una categoria
router.put('/:id',CategoryController.updateCategory);

// Eliminar (actualizando el campo) una categoria
router.delete('/:id',CategoryController.deleteCategory)

module.exports = router;