// HACER LA CONEXION DE MYSQL CON NODE
const mysql = require('mysql2/promise'); // Trabajar con promesas (async/await)
require('dotenv').config(); // cargas las variables de entorno desde un .env. (process.env) 


const database = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port:process.env.DB_PORT,
})

// Verificando la conexión con la base de datos

async function testConnection(){
    try{
        const connection = await database.getConnection(); // intenta obtener una conexion del pool
        console.log('Conexion exitosa');
        //connection.release();
    }catch (error){
        console.error('Error al conectar con la base de datos',error.message);
    }
}

testConnection(); // Llamamos a nuestra función de testeo

module.exports = database; //hago mi database sea exportable con el fin de poder utilizarlo en otros archivos