import Usuario from "../models/Usuarios.js"
import generarJWT from "../helpers/generarJWT.js"


//Metodo para registrar a los usuarios
const registrar = async (request,response)=>{
    //Evitar documentos duplicados
    const {email} = request.body
    const existeUsuario = await Usuario.findOne({email})

    if(existeUsuario){
        const error = new Error("Usuario ya esta registrado")
        return response.status(404).json({msg:error.message})
    }

    //Guardar documentos de usuarios
    try {
      const usuario = new Usuario(request.body)
      const usuarioAlmacenado = await usuario.save()
      response.json(usuarioAlmacenado)  
    } catch (error) {
        console.log(error)
    }
}

//Metodo para autenticar a los usuarios
const autenticar = async(request,response)=>{
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
        return response.json({
            _id:usuario._id,
            nombre:usuario.nombre,
            email:usuario.email,
            token:generarJWT(usuario._id,usuario.nombre)
        })
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