const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();
const upload = require('../middleware/upload');

// Obtener todos los productos
router.get('/',ProductController.getAllProducts);

// Obtener un producto por ID
router.get('/:id',ProductController.getProductById);

// registrar nuevo producto
router.post('/',upload.single('image'),ProductController.createProduct);

// actualizar un producto
router.put('/:id',upload.single('image'), ProductController.updateProduct);

// Eliminar un producto
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
