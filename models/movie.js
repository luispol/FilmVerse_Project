// Mongoose
import mongoose from "mongoose";

// SCHEMA
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    directors: {
        type: [String],
        required: true
    },
    fullplot: {
        type: String,
        trim: true,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    released: {
        type: Date,
        required: true
    },
    countries: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    trailer: {
        type:String,
        trim:true,
        required:true
    }
}, {
    timestamps: true
});

// Collection
const movie = mongoose.model("movie", movieSchema);
export default movie; 