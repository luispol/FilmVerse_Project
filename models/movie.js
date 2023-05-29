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
    fullplot: {
        type: String,
        trim: true,
        required: true
    },
    released: {
        type: Date,
        required: true
    },
    tomatoes: {
        rating: {
            type: Number,
            require: false,
            integer: true // Integer validation
        }
    }
}, {
    timestamps: true
});

// Collection
const movie = mongoose.model("movie", movieSchema);
export default movie; 