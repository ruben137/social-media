import express from 'express'

import {getPosts,createPost,updatePost,deletePost, deleteComment, likeComment , getNotifications, deleteNotification,newNotification,commentPost } from '../controllers/posts.js'
import {upload} from '../libs/storage.js'
import auth from '../middleware/auth.js'

const router=express.Router();

router.get('/:skip',auth,getPosts)
router.get('/notifications/:user',auth,getNotifications)
router.delete('/deleteNotification/:id/:from/:type',auth,deleteNotification)
router.post('/newNotification',newNotification)
router.post('/',upload.single('image'),createPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/commentPost/:id',auth,commentPost);
router.patch('/:id/:index',deleteComment)
router.patch('/likecomment/:id/:date',auth,likeComment)

export default router;





