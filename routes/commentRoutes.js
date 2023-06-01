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

router.route('/:id')
    .post(checkAuth, setComment)
    .get(getComments)


export default router;
