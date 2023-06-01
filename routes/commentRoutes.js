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

router.route('/:id')
    .post(checkAuth, setComment)


export default router;
