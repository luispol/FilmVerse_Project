import express from "express";

import {
    getAllMovies,
    getMoviesCard,
    setMovie,
    editMovie,
    deleteMovie
} from "../controllers/movieController.js"

// tambien verificara que es un administrador al intentar ingresar
import authAdmin from "../middleware/authAdmin.js"

const router = express.Router();

router.route('/')
    .get(getAllMovies)
    .post(setMovie);

router.route('/card')
    .get(getMoviesCard)
    .put(editMovie)
    .delete(deleteMovie);

export default router;
