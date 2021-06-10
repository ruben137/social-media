import Conversation from "../models/conversations.js";

import Message from "../models/MessageModel.js";
import { connection } from "../server.js";

export const getMessages = async (req, res) => {
  const { user, id } = req.params;
  const Messages = connection.collection("messages");

  try {
    const filter = { conversationId: id, sender: user, seen: false };
    const update = { $set: { seen: true } };
    await Messages.updateMany(filter, update);

    const messages = await Message.find({
      conversationId: id,
    });

    const filterMessages = messages.filter((item) =>
      item.members.includes(req.userId)
    );

    res.status(200).json(filterMessages);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};

export const getLastMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      members: { $in: [req.userId] },
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};

export const createConversation = async (req, res) => {
  const { receiver } = req.body;
  const sender = req.userId;

  const newConversation = new Conversation({
    members: [sender],
    backup: [sender, receiver],
  });

  const prevConversation = await Conversation.findOne({
    members:{$in:[receiver]},
    backup:{$in:[sender]} 
  });



  try {
    if (prevConversation && prevConversation.members.length < 2) {
      prevConversation.members.push(sender);
      const savedConversation = await Conversation.findByIdAndUpdate(
        prevConversation._id,
        prevConversation,
        { new: true }
      );
      res.status(200).json(savedConversation);
    } else {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    }
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const deleteConversation = async (req, res) => {
  const { id } = req.params;

  try {
    const conversation = await Conversation.findById(id);
    const index2 = conversation.members.findIndex((id) => id === req.userId);

    if (conversation.members.length > 1) {
      conversation.members.splice(index2, 1);

      await Conversation.findByIdAndUpdate(id, conversation, {
        new: true,
      });
      const conversations = await Conversation.find({
        members: { $in: [req.userId] },
      });
      res.status(200).json(conversations);
    }
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const deleteConversationFromDb = async (req, res) => {
  const { id } = req.params;

  const conversation = await Conversation.findById(id);
  try {
    if (conversation && conversation.members.length < 2) {
      await Conversation.findByIdAndRemove(id);
      const conversations = await Conversation.find({
        members: { $in: req.userId },
      });

      res.status(200).json(conversations);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessages = async (req, res) => {
  const { id } = req.params;
  const { receiver } = req.body;
  const messages = connection.collection("messages");

  const filter = { conversationId: id };
  const updatedDoc = { $set: { members: [receiver] } };

  try {
    await messages.updateMany(filter, updatedDoc);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const deleteMessagesFromDb = async (req, res) => {
  const { id } = req.params;
  const messages = connection.collection("messages");

  try {
    const filter = { conversationId: id };

    await messages.deleteMany(filter);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const getConversations = async (req, res) => {
  const user = req.userId;

  try {
    const conversation = await Conversation.find({
      members: { $in: [user] },
    }).sort({ updatedAt: -1 });

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const sendMessage = async (req, res) => {
  const { receiver, conversationId } = req.body;
  const newMessage = new Message(req.body);
  const conversation = await Conversation.findById(conversationId);

  try {
    if (conversation && conversation.members.length < 2) {
      conversation.members.push(receiver);
      await Conversation.findByIdAndUpdate(conversation._id, conversation, {
        new: true,
      });
    } else {
      await Conversation.findByIdAndUpdate(conversation._id, conversation, {
        new: true,
      });
    }

    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const deleteMessageNotifications = async (req, res) => {
  const { id, type, from } = req.params;

  try {
    const Notifications = connection.collection("notifications");
    await Notifications.deleteMany({ notificationId: id, from, type });

    res.status(200).json({ message: "notifications deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
