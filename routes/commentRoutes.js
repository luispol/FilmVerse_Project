import express from "express";

import {
    getComment,
    getComments,
    editComment,
    deleteComment,
    setComment
} from '../controllers/commentController.js';

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route('/')
    .get(getComments)
    .post(checkAuth, setComment);

router.route('/:id')
    .get(checkAuth, getComment)
    .put(checkAuth, editComment)
    .delete(checkAuth, deleteComment);

export default router;
