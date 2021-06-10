import express from 'express'

import { getUserPosts,getUser,updateProfile, follow,getUsers, searchUser, getProfilePic} from '../controllers/userPosts.js';

import auth from '../middleware/auth.js'

import {getNotifications,deleteNotification} from '../controllers/userPosts.js'

const router=express.Router();

router.get('/',getUsers)
router.get('/notifications',auth,getNotifications)
router.patch('/delete/:index',auth, deleteNotification);
router.get('/search/:query',searchUser)
router.get('/:name',getUser)
router.get('/userPosts/:name',getUserPosts)
router.put('/:id',auth,updateProfile)
router.put('/follow/:id',auth,follow)
router.get('/getpic/:name',getProfilePic)


export default router;

