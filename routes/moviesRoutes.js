import express from "express";

import {
    getAllMovies,
    getMoviesCard,
    setMovie,
    editMovie,
    deleteMovie
} from "../controllers/movieController.js"

import authenticationAdmin from "../middleware/authenticationAdmin.js"

const router = express.Router();

router.route('/')
    .get(getAllMovies)
    .post(setMovie, authenticationAdmin);

router.route('/card')
    .get(getMoviesCard)
    .put(editMovie, authenticationAdmin)
    .delete(deleteMovie, authenticationAdmin);

export default router;
