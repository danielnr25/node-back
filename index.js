// CONFIGURANDO EL SERVIDOR CON EXPRESS
const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
// CONFIGURACION DE RUTAS
const authRoutes = require('./src/routes/authRoutes');

const server = express(); // configurando el servidor para las peticiones HTTP
server.use(cors())
server.use(express.json()); // leer json del body (Middleware para datos JSON)
server.use(express.urlencoded({extended:true})) //formulario codificado (Middlware para formulario de HTML)

// LAS RUTAS PRINCIPALES
server.use('/auth',authRoutes) //  http://localhost:3000/api/auth


const PORT = process.env.PORT || 8000;
server.listen(PORT, ()=>{
    console.log(`Servidor en el puerto: http://localhost:${PORT}`);   
})



