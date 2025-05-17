const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

//OBTENER TODAS LAS CATEGORIAS
router.get('/',CategoryController.getAllCategories);



module.exports = router;