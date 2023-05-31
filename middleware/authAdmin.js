// imports

// Middleware para autenticar el tipo de usuario
const authAdmin = (req, res, next) => {
    const usuario = req.usuario.tipo; // puede ser null si no se autentica
    console.log("tipo de usuario: " + req.usuario.tipo)

    // === mismo tipo de dato
    if (usuario === "1") {
      // Si el usuario autenticado es un administrador, pasa al siguiente middleware o controlador
      req.esAdmin = true;
      console.log("es usuario admin: " + usuario) 
    } else {
      // Si el usuario no es un administrador
      req.esAdmin = false;
      console.log("es usuario comun: " + usuario) 
    }
    next();
  };
  
export default authAdmin;
  