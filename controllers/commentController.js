import Comments from "../models/comments.js";
import movies from "../models/movie.js";


const getComment = async (request, response) =>{
    console.log("No hay")
}

const getComments = async (request, response) =>{
    const { id } = request.params;
    console.log(id)
    const movie = await movies.findById(id);
    console.log("find: " + movie + "Comentario ID") 

    if(!movie) {
        // Si no se encuentra la película, se devuelve un mensaje de error
        return response.status(404).json({msg:"Pelicula no encontrada"}) 
    }

    // Busca todos los comentarios relacionados con la película
    const comments = await Comments.find({ movie_id: movie._id }); 
    // Si algún comentario no coincide con el ID de la película, se devuelve un mensaje de error
    for (const comment of comments) {
        if (comment.movie_id.toString() !== movie._id.toString()) {
            return response.status(404).json({ msg: "Comentario no válido" }); 
        }
    }
    // carga todos los comentarios
    const allcomments = await Comments.find({ movie_id: movie._id }); 

    response.json({
        movie,
        allcomments 
    })
}


const setComment = async (request, response) =>{
    const comment = new comments(request.body);
    comment.movie_id = request.usuario._id;
    comment.nombre = request.usuario.nombre;

    console.log("Request comment" + comment)

    try {
        const commentSave = await comment.save();
        response.json(commentSave);
    } catch (error) {
        console.log("Error al guardar comentario" + error);
    }
};


const editComment = async (request, response) =>{
    
}

const deleteComment = async (request, response) =>{
    
}


export {
    getComment,
    getComments,
    setComment,
    editComment,
    deleteComment
}
