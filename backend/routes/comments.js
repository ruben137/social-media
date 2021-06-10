import express from 'express'
import { getComments, newComment,deleteComment, likeComment } from '../controllers/comments.js';

import auth from '../middleware/auth.js'

const router=express.Router();
router.get('/:id',getComments)
router.post('/',newComment)
router.delete('/:id',deleteComment)
router.patch('/:id',auth,likeComment)

export default router