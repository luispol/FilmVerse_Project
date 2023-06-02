import express from "express";

import {
    getAllMovies,
    getMoviesCard,
    setMovie,
    editMovie,
    deleteMovie,
    searchMovies
} from "../controllers/movieController.js"

const router = express.Router();

router.route('/')
    .get(getAllMovies)
    .post(setMovie);

router.route('/card')
    .get(getMoviesCard)
    .put(editMovie)
    .delete(deleteMovie);

// Ruta de búsqueda de películas
router.route('/search')
    .post(searchMovies);

export default router;
