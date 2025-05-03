const bcrypt = require('bcryptjs'); // nos permitirá hashear(encriptar) y comparar de manera segura

const password = '123456';
const salRounds = 12; //es el grado de complejidad del algoritmo,el estándar seguro es entre 10 a 12 para la mayoria de app de software

bcrypt.hash(password,salRounds,(err,hash)=>{
    if(err){
        console.log('Error al generar el hash',err)
        return
    }
    console.log('Contraseña generada: ',hash);
})