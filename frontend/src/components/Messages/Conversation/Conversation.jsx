import { Avatar, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useStyles } from "../styles";
import * as api from "../../../api/index";
import MenuIcon from "@material-ui/icons/Menu";

const Conversation = ({
  conversation,
  setCurrentConversation,
  deleteMessageNotifications,
  setMessages,
  setProfilePic,
  setMessageTo,
  DoDecrypt,
  setzIndex,
  logUser,
  lastMessages,
  filterMessages,
  handleMenuOpen,
  setConversationId,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [barProfilePic, setBarProfilePic] = useState("");
  const user = conversation.backup.find(
    (user) => user !== logUser?.result?.userName
  );
  const lastMessage =
    lastMessages[filterMessages?.lastIndexOf(conversation._id)];

  useEffect(() => {
    const getProfilePic = async () => {
      try {
        const { data } = await api.getProfilePic(user);
        setBarProfilePic(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfilePic();
  }, [user]);
  return (
    conversation.members.includes(logUser?.result?.userName) && (
      <div className={classes.listItemContainer}>
        <Avatar src={barProfilePic} />
        <div
          className={classes.listItem}
          onClick={() => {
            setCurrentConversation(conversation);
            dispatch(
              deleteMessageNotifications(conversation._id, "message", user)
            );

            const getMessages = async () => {
              try {
                const { data } = await api.getMessages(conversation._id, user);
                data.forEach(
                  (element) => (element.text = DoDecrypt(element.text))
                );
                setMessages(data);
                setProfilePic(barProfilePic);
              } catch (error) {
                console.log(error);
              }
            };

            getMessages();
            setMessageTo(user);
            setzIndex(200);
          }}
        >
          {user} <br />{" "}
          <span style={{ fontWeight: 100 }}>
            {!lastMessages.length ? (
              "No messages"
            ) : (
              <Typography style={{ fontSize: 14, color: "#7f8c8d" }}>
                {lastMessage?.text.length > 21
                  ? lastMessage?.text.slice(0, 17) + "...."
                  : lastMessage?.text}
              </Typography>
            )}
          </span>{" "}
        </div>
        <IconButton
          onClick={(e) => {
            handleMenuOpen(e);
            setConversationId(conversation._id);
            setMessageTo(user);
            setCurrentConversation(conversation);
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>
    )
  );
};

export default Conversation;
