import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import Notifications from "../models/notifications.js";
import fs from "fs";
import { promisify } from "util";
import mongoose from "mongoose";

const unlinkAsync = promisify(fs.unlink);

export const getPosts = async (req, res) => {
  const user = await userModel.findOne({ userName: req.userId });
  try {
    const posts = await postModel
      .find({ name: { $in: [...user.following,req.userId] } })
      .skip(+req.params.skip)
      .limit(5)
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};


export const createPost = async (req, res) => {
  const post = req.body;
  const user = await userModel.findOne({ userName: post.name });
  user.number++
  const newPostModel = new postModel({
    ...post,
    createdAt: new Date().toISOString(),
  });

  if (req.file) {
    const { filename } = req.file;
    newPostModel.setUrl(filename);
  }

  try {
    await newPostModel.save();
    await userModel.findByIdAndUpdate(user._id,user,{new:true})
    res.status(201).json(newPostModel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await postModel.findById(id);
  const user = await userModel.findOne({ userName: post.name });
  user.posts--
  const arr = post.url.split("/");
  await unlinkAsync(`storage/imgs/${arr[arr.length - 1]}`);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");
  await postModel.findByIdAndRemove(id);
  await userModel.findByIdAndUpdate(user._id,user,{new:true})
  res.json({ message: "Post deleted succesfully" });
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { message, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const updatedPost = { message, tags };

  const update = await postModel.findByIdAndUpdate(id, updatedPost, {
    new: true,
  });

  res.json(update);
};

export const likePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post.likeCount.includes(req.userId)) {
      await post.updateOne({ $push: { likeCount: req.userId } });
    } else {
      await post.updateOne({ $pull: { likeCount: req.userId } });
    }
    const updatedPost = await postModel.findById(req.params.id);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const likeComment = async (req, res) => {
  const { id, date } = req.params;
  const post = await postModel.findById(id);

  const commentIndex = post.comments.findIndex(
    (comment) => comment.mlDate === +date
  );

  const index = post.comments[commentIndex].likes.findIndex(
    (user) => user === req.userId
  );

  try {
    if (index === -1) {
      post.comments[commentIndex].likes.push(req.userId);
    } else {
      post.comments[commentIndex].likes = post.comments[
        commentIndex
      ].likes.filter((user) => user !== req.userId);
    }

    const updatedPost = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const comment = req.body;

  const logUser = await userModel.findOne({ userName: req.userId });
  const post = await postModel.findById(id);

  const mlDate = Date.now();
  try {
    await post.updateOne({
      $push: {
        comments: {
          ...comment,
          date: new Date().toISOString(),
          name: req.userId,
          profilePic: logUser.profilePic,
          likes: [],
          mlDate,
        },
      },
    });

    post.comments = post.comments.sort((a, b) => b.mlDate - a.mlDate);
    const updatedPost = await postModel.findById(id);

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id, index } = req.params;

  const post = await postModel.findById(id);
  const user = await userModel.findOne({ userName: post.name });

  try {
    post.comments.splice(index, 1);

    const updatedPost = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    await userModel.findByIdAndUpdate(user._id, user, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { user } = req.params;

    const notifications = await Notifications.find({ to: user });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const newNotification = async (req, res) => {
  const { notificationId, from, type } = req.body;

  try {
    const newNotification = new Notifications(req.body);
    const prevNotification = await Notifications.findOne({
      notificationId,
      from,
      type,
    });
    if (prevNotification && prevNotification.type === "like") return;
    await newNotification.save();
    res.status(200).json({ message: "notification sended" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteNotification = async (req, res) => {
  const { id, from, type } = req.params;

  try {
    await Notifications.findByIdAndDelete(id);
    await Notifications.findOneAndDelete({
      notificationId: id,
      from,
      type,
    });

    res.status(200).json({ message: "notification deleted" });
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
};


