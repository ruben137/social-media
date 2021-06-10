import express from 'express'

import { dislikePost,getLikes,likePost } from '../controllers/likes.js';

const router=express.Router();
router.get('/:id',getLikes)
router.post('/',likePost)
router.delete('/:id',dislikePost)




export default router