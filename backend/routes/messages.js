import express from 'express'
import { createConversation, deleteConversation, deleteMessages, deleteMessagesFromDb, getConversations, getLastMessages, getMessages, sendMessage,deleteConversationFromDb, deleteMessageNotifications } from '../controllers/messages.js';
import auth from '../middleware/auth.js'

const router=express.Router();

router.get('/lastMessages',auth,getLastMessages)
router.get('/allMessages/:id/:user',auth,getMessages)
router.get('/conversations',auth,getConversations)
router.post('/conversations',auth,createConversation)
router.post('/sendMessage',auth,sendMessage)
router.patch('/deleteConversation/:id',auth,deleteConversation)
router.delete('/deleteConversation/:id',auth,deleteConversationFromDb)
router.patch('/deleteMessages/:id',auth,deleteMessages)
router.delete('/deleteMessages/:id',auth,deleteMessagesFromDb)
router.delete('/deleteMessageNotifications/:id/:type/:from',auth,deleteMessageNotifications)

export default router