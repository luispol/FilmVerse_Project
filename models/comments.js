import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"movie"
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const comment = mongoose.model("comment", commentSchema);
export default comment;