import Usuario from "../models/Usuarios.js"
import generarJWT from "../helpers/generarJWT.js"


//Metodo para registrar a los usuarios
const registrar = async (request,response)=>{
    try {
    //Evitar documentos duplicados
    const {email, tipo} = request.body
    const existeUsuario = await Usuario.findOne({email})

    if(existeUsuario){
        const error = new Error("Usuario ya esta registrado")
        return response.status(404).json({msg:error.message})
    }

    // Verificando si el usuario es de tipo administrador o tipo usuario comun
    const datosUsuario = {
        // para evitar poner todas los clave valor del documento o del modelo
        ...request.body,
        // se asigna un valor si un administrador lo asigna, sino se pone como usuario comun
        tipo: tipo || 2
    }

    //Guardar documentos de usuarios
      const usuario = new Usuario(datosUsuario)
      const usuarioAlmacenado = await usuario.save()
      response.json(usuarioAlmacenado)  
    } catch (error) {
        console.log("Error al guardar usuario: " + error)
    }
}

//Metodo para autenticar a los usuarios
const autenticar = async(request,response, next)=>{
    //Comprobar si el usuario existe
    const {email,password}=request.body
    const usuario = await Usuario.findOne({email})
    //response.json(usuario)
    if(!usuario){
        const error = new Error("Usuario no existe")
        return response.status(403).json({msg:error.message})
    }
    //Comprobar el password
    if (await usuario.comprobarPassword(password)){
        request.usuario ={
            _id:usuario._id,
            nombre:usuario.nombre,
            email:usuario.email,
            token:generarJWT(usuario._id,usuario.nombre),
            tipo:usuario.tipo
        };

        next();
    } else{
        const error = new Error("Password incorrecto")
        return response.status(403).json({msg:error.message})
    }
}

//Verificacion de perfil
const perfil = async (request,response)=>{
    //console.log("Dentro del perfil")
    const {usuario} = request
    response.json(usuario)
}


export{
    registrar,
    autenticar,
    perfil
}