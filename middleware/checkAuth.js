import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuarios.js'

const checkAuth = async(request,response, next)=>{
    console.log(request.headers.authorization)
    let token
    if (
        request.headers.authorization && 
        request.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = request.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //console.log(decoded)
            request.usuario= await Usuario.findById(decoded.id).select("-password -createdAt -updatedAt -__v")
            console.log(request.usuario)
        } catch (error) {
            return response.status(404).json({msg:"Hubo un error"})
        }
    }

    if(!token){
        return response.status(401).json({msg:"Token no valido"})
    }

    next()
}

export default checkAuth