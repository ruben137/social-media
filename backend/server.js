import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import userProfileRoutes from "./routes/userPosts.js";
import messagesRoutes from "./routes/messages.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import profilePicRoutes from "./routes/profilePic.js";

import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import path from "path";

const __dirname = path.resolve();

dotenv.config();
const app = express();
const httpServer = createServer(app);

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  })
);

app.use("/public", express.static(`${__dirname}/storage/imgs`));

app.use("/profile", profilePicRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/userProfile", userProfileRoutes);
app.use("/messages", messagesRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(userId);
    io.emit("getUsers", users);
  });
  console.log("a user connected");

  socket.on(
    "send-message",
    ({ sender, conversationId, text, members, receiver, backup }) => {
      const user = getUser(receiver);
      if (!user) return;

      io.to(user.socketId).emit("receive-message", {
        sender,
        text,
        receiver,
        conversationId,
        members,
        backup,
      });
    }
  );

  socket.on("send-notification", (notification) => {
    const user = getUser(notification.receiver);

    if (!user) return;

    io.to(user.socketId).emit("get-notification", notification);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const PORT = process.env.PORT || 5000;
const DB_ADMIN = process.env.DB_ADMIN;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const URI = `mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@cluster0.j3nld.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("connected to mongoDB");
  }
);

httpServer.listen(PORT, () => {
  console.log(`server in port ${PORT}`);
});

export const connection = mongoose.connection;
