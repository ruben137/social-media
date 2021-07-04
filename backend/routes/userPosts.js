import express from 'express'

import { getUserPosts,getUser,updateProfile, follow,getUsers, searchUser, getProfilePic, getFollowers, getFollowing, getNumberOfPosts} from '../controllers/userPosts.js';

import auth from '../middleware/auth.js'

import {getNotifications,deleteNotification} from '../controllers/userPosts.js'

const router=express.Router();

router.get('/',getUsers)
router.get('/postsNumber/:name',getNumberOfPosts)
router.get('/notifications',auth,getNotifications)
router.get("/followers/:user/:skip",auth,getFollowers)
router.get("/following/:user/:skip",auth,getFollowing)
router.patch('/delete/:index',auth, deleteNotification);
router.get('/search/:query',searchUser)
router.get('/getUser/:name',getUser)
router.get('/userPosts/:name/:skip',getUserPosts)
router.put('/:id',auth,updateProfile)
router.put('/follow/:id',auth,follow)
router.get('/getpic/:name',getProfilePic)


export default router;

