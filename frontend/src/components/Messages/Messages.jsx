import { Avatar, Button, IconButton, Typography } from "@material-ui/core";
import React, { useState, useEffect, useRef, useCallback } from "react";

import socket from "./SocketProvider";
import * as api from "../../api";
import { useWindowSize } from "./useWindowSize";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import notification from "../../audio/notification.mp3";

import { DoDecrypt, DoEncrypt } from "./aes";
import { newNotification } from "../../actions/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/posts";
import { useStyles } from "./styles";

const Messages = ({
  logUser,
  messageTo,
  messages,
  setMessages,
  currentConversation,
  profilePic,
  setzIndex,
  zIndex,
  setOnlineUsers,
  setLastMessages,
  onlineUsers,
}) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const messageRef = useRef(null);

  const user = useSelector((state) => state?.user);
  useEffect(() => {
    dispatch(getUser(logUser));
  }, [dispatch, logUser]);

  const sendMessage = useCallback(
    async (message) => {
      let newMessages = { ...message, text: DoDecrypt(message.text) };

      if (currentConversation._id === message.conversationId)
        setMessages([...messages, newMessages]);

      setLastMessages([...messages, newMessages]);
      const sound = new Audio(notification);
      if (logUser === message.receiver) sound.play();
    },
    [setMessages, messages, setLastMessages, currentConversation._id, logUser]
  );

  const addMessageToConversation = async (message) => {
    let newMessages = { ...message, text: DoDecrypt(message.text) };
    setMessages([...messages, newMessages]);
    setLastMessages([...messages, newMessages]);
    if (!onlineUsers?.includes(messageTo)) {
      await dispatch(
        newNotification({
          notificationId: currentConversation._id,
          type: "message",
          from: message.sender,
          to: message.receiver,
          notification: `${message.sender} send you a message`,
        })
      );
    }
  };

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    socket.emit("addUser", logUser);
  }, [logUser]);

  useEffect(() => {
    const getOnlineUsers = (users) => {
      setOnlineUsers(
        user?.following?.filter((f) => users.some((u) => u.userId === f))
      );
    };
    socket.on("getUsers", getOnlineUsers);
  }, [user, setOnlineUsers]);

  async function handleSubmit(e) {
    e.preventDefault();

    const message = {
      sender: user.userName,
      receiver: messageTo,
      text: DoEncrypt(text),
      conversationId: currentConversation._id,
      members: [user.userName, messageTo],
      backup: [user.userName, messageTo],
    };
    await api.sendMessage(message);
    socket.emit("send-message", message);

    addMessageToConversation(message);
    sendMessage(message);
    setText("");
  }

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", sendMessage);

    return () => socket.off();
  }, [sendMessage]);

  const size = useWindowSize();

  return (
    <>
      {messageTo && (
        <>
          <div
            className={classes.messagesContainer}
            style={{
              width: size.width > 500 ? "calc(100vw - 250px)" : "100%",

              position: size.width < 500 ? "absolute" : "unset",
              zIndex,
            }}
          >
            <div
              className={classes.bar}
              style={{
                justifyContent: size.width < 500 ? "space-between" : "flex-end",
              }}
            >
              <IconButton
                style={{ display: size.width < 500 ? "block" : "none" }}
                onClick={() => setzIndex(0)}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography style={{ fontWeight: 700, marginRight: 5 }}>
                  {messageTo}
                </Typography>
                <Avatar src={profilePic} />
              </div>
            </div>
            <div
              style={{
                height:
                  size.width > 500
                    ? "calc(100vh - 64px - 50px - 80px)"
                    : "calc(100vh - 56px - 50px - 80px)",
              }}
              className={classes.window}
            >
              {messages.map((item, i) => {
                const lastMessage = messages.length - 1 === i;

                return (
                  <div
                    ref={lastMessage ? messageRef : null}
                    key={i}
                    style={{
                      alignSelf:
                        item.sender === logUser ? "flex-end" : "flex-start",
                      margin: "2px 0",
                    }}
                  >
                    <div
                      style={{
                        background:
                          item.sender === logUser ? "#03a9f4" : "white",
                      }}
                      className={classes.messageText}
                    >
                      {item.text}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ width: "100%" }}>
              <form
                className={classes.form}
                onSubmit={handleSubmit}
                onKeyPress={(e) => {
                  if (e.code === "Enter") handleSubmit(e);
                }}
              >
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={classes.textarea}
                />
                <Button className={classes.button} type="submit">
                  Send
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Messages;
