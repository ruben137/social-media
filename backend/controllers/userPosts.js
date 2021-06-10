import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";
import mongoose from "mongoose";
import ProfilePic from "../models/picture.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { name } = req.params;

  try {
    const user = await userModel.findOne({ userName: name });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const follow = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no user with that id");

  const user = await userModel.findById(id);
  const logUser = await userModel.findOne({ userName: String(req.userId) });

  const index = user.followers.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    user.followers.push(req.userId);
    logUser.following.push(user.userName);
  } else {
    user.followers = user.followers.filter((id) => id !== String(req.userId));
    logUser.following = logUser.following.filter((id) => id !== user.userName);
  }
  const updatedProfile = await userModel.findByIdAndUpdate(id, user, {
    new: true,
  });

  await userModel.findByIdAndUpdate(logUser._id, logUser, {
    new: true,
  });
  res.status(200).json(updatedProfile);
};

export const getUserPosts = async (req, res) => {
  const { name } = req.params;
  try {
    const user = await userModel.findOne({ userName: name });

    if (!user) return res.status(404).json({ message: "no user" });

    const userPosts = await postModel.find({ name }).sort({ createdAt: -1 });

    if (!userPosts.length) return res.status(200).json({ username: user });

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserNotifications = async (req, res) => {
  const { name } = req.params;
  try {
    const user = await userModel.findOne({ userName: name });
    if (!user) return res.status(404).json({ message: "no user" });

    const userPosts = await postModel.find({ name: name });

    if (!userPosts.length)
      return res
        .status(404)
        .json({ message: "You don't have any notification" });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const user = await userModel.findOne({ userName: String(req.userId) });
    if (!user) return res.status(404).json({ message: "no user" });
    const { notifications } = user;

    if (!notifications.length) return;

    res.status(200).json(notifications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  const { index } = req.params;
  const user = await userModel.findOne({ userName: String(req.userId) });

  try {
    if (!user) return res.status(404).json({ message: "no user" });

    user.notifications.splice(index, 1);

    const updatedProfile = await userModel.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const profilePic = await ProfilePic.findOne({ name: req.userId });

  const user = await userModel.findById(id);

  try {
    if (profilePic) {

      user.profilePic = profilePic.url;
    }

    user.description = description;

    const updatedProfile = await userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const searchUser = async (req, res) => {
  const { query } = req.params;
  try {
    const users = await userModel.find({
      userName: { $regex: query, $options: "i" },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProfilePic = async (req, res) => {
  const { name } = req.params;
  try {
    const user = await userModel.findOne({ userName: name });
    res.status(200).json(user.profilePic);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
