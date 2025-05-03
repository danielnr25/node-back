const express = require('express')
const router = express.Router(); // solicito de express el uso de ROUTER

const authController = require('../controllers/authController')

router.post('/login',authController.login);
//router.post('/register',authController.register);


module.exports = router;
