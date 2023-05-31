import comments from "../models/comments.js";

const getComment = async (request, response) =>{
    const comment = await comments.find({movie_id:request.usuario._id});
    response.json(comment);    
}

const getComments = async (request, response) =>{
    const comment = await comments.find();
    response.json(comment); 
}

const setComment = async (request, response) =>{
    const comment = new comments(request.body);
    comment.movie_id = request.usuario._id;
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
