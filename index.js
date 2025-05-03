// CONFIGURANDO EL SERVIDOR CON EXPRESS
const express = require('express');
require('dotenv').config(); 

const server = express(); // configurando el servidor para las peticiones HTTP

const PORT = process.env.PORT || 8000;
server.listen(PORT, ()=>{
    console.log(`Servidor en el puerto: http://localhost:${PORT}`);   
})



