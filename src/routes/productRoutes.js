const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();

// Obtener todos los productos
router.get('/',ProductController.getAllProducts);

// Obtener un producto por ID
router.get('/:id',ProductController.getProductById);

// Registrar nuevo producto
router.post('/',ProductController.createProduct);

// Actualizar un producto
router.put('/:id', ProductController.updateProduct);

// Eliminar un producto
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
