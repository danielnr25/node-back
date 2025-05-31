const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// request(req): representa la solicitud del cliente
// response(res): se usa para enviar la respuesta al cliente
module.exports.login = async(req,res) =>{

    const {username,password } = req.body // destructuracion de objeto
    try {
        const results = await User.findByUsername(username); // pasando al usermodel y ejecutando la consulta

        if(results.length>0){
            const user = results[0]; // solamente la informacion de los datos del usuario
            const isMatch = await bcrypt.compare(password,user.password) // true o false
            if(isMatch){
                const payload = {
                    id:user.id,
                    username:user.username,
                    role:user.tipo_usuario_id
                }
                const token = jwt.sign(payload,process.env.CLAVE_SECRETA,{expiresIn:"24h"});
                return res.status(200).json({  message: "Usuario autenticado con éxito.",data:user,token})
            }else{
                return res.status(401).json({
                    message: "Contraseña incorrecta, verifique nuevamente."
                })
            }
        }else{
            return res.status(401).json({ message: "Usuario no encontrado, verifique nuevamente."})
        }
    } catch (error) {
        console.error("Error inesperado: ",error);
        return res.status(500).json({
            message:"Error interno del servidor, comuniquese con el administrador del sistema."
        })
    }
}


/*
    LOGIN

    usuario
    contraseña

    INICIAR SESION

    req.body = {
        USERNAME:admin,
        PASSWORD:12345678
    }

*/