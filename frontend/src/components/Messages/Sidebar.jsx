import { Button, Menu, MenuItem } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUser, getUsers } from "../../actions/posts";
import * as api from "../../api";
import Messages from "./Messages";
import { useWindowSize } from "./useWindowSize";
import TransitionsModal from "./Modal";
import { DoDecrypt } from "./aes";
import { deleteMessageNotifications } from "../../actions/navigation";
import { useHistory } from "react-router";
import { useStyles } from "./styles";
import Contact from "./Contact/Contact";
import Conversation from "./Conversation/Conversation";

const Sidebar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const logUser = JSON.parse(localStorage.getItem("profile"));
  const [conversations, setConversations] = useState([]);
  const [zIndex, setzIndex] = useState(0);
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.userState);

  const [showConversations, setShowConversations] = useState(true);
  const [showContacts, setShowContacts] = useState(false);
  const [messageTo, setMessageTo] = useState(null);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [profilePic, setProfilePic] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const size = useWindowSize();

  useEffect(() => {
    if (!logUser) {
      history.push("/auth");
    }
  }, [history, logUser]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUser(logUser?.result?.userName));
  }, [dispatch, logUser?.result?.userName]);

  useEffect(() => {
    const getLastMessage = async () => {
      try {
        const { data } = await api.getLastMessages();
        data.forEach((element) => (element.text = DoDecrypt(element.text)));
        setLastMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    getLastMessage();
  }, []);

  const filterMessages = lastMessages.map((item) => item.conversationId);

  const contacts = users.filter((user) =>
    currentUser?.user?.following?.includes(user.userName)
  );

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await api.getConversations();

        setConversations(data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [messages]);

  const createConversation = async (username) => {
    let check;
    if (conversations.length) {
      check = conversations
        .map((item) => item.backup)
        .reduce((a, b) => {
          return a.concat(b);
        });

      if (check.includes(username)) return;
    }
    try {
      const { data } = await api.createConversation(username);
      setConversations([...conversations, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "long-menu";
  const ITEM_HEIGHT = 48;

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
        },
      }}
    >
      <MenuItem onClick={handleMenuClose} style={{ padding: 3 }}>
        <TransitionsModal
          conversationId={conversationId}
          messageTo={messageTo}
          setConversations={setConversations}
          setMessageTo={setMessageTo}
          members={currentConversation.members}
          messages={messages}
          user={logUser?.result?.userName}
        />
      </MenuItem>
    </Menu>
  );

  const isOnline = (user) => {
    return onlineUsers?.some((onlineUser) => onlineUser === user);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: size.width > 500 ? "250px" : "100%",
          }}
          className={classes.sidebarContainer}
        >
          <Button
            onClick={() => {
              setShowConversations(true);
              setShowContacts(false);
            }}
            style={{
              background: showConversations ? "#03a9f4" : "white",
              color: showConversations ? "white" : "black",
            }}
            className={classes.sidebarButton}
          >
            Chats
          </Button>

          <Button
            onClick={() => {
              setShowConversations(false);
              setShowContacts(true);
            }}
            style={{
              background: showContacts ? "#03a9f4" : "white",
              color: showContacts ? "white" : "black",
            }}
            className={classes.sidebarButton}
          >
            Contacts
          </Button>
          {showContacts && (
            <div style={{ background: "white" }}>
              {contacts.map((user, i) => (
                <Contact
                  key={i}
                  user={user}
                  setShowConversations={setShowConversations}
                  setShowContacts={setShowContacts}
                  isOnline={isOnline}
                  createConversation={createConversation}
                />
              ))}
            </div>
          )}
          {showConversations && (
            <div style={{ background: "white" }}>
              {conversations?.map((conversation, i) => (
                <Conversation
                  key={i}
                  conversation={conversation}
                  setCurrentConversation={setCurrentConversation}
                  deleteMessageNotifications={deleteMessageNotifications}
                  setMessages={setMessages}
                  setProfilePic={setProfilePic}
                  setMessageTo={setMessageTo}
                  DoDecrypt={DoDecrypt}
                  setzIndex={setzIndex}
                  logUser={logUser}
                  lastMessages={lastMessages}
                  filterMessages={filterMessages}
                  profilePic={profilePic}
                  handleMenuOpen={handleMenuOpen}
                  setConversationId={setConversationId}
                />
              ))}
            </div>
          )}
        </div>
        <Messages
          logUser={logUser?.result?.userName}
          messageTo={messageTo}
          messages={messages}
          setMessages={setMessages}
          currentConversation={currentConversation}
          profilePic={profilePic}
          zIndex={zIndex}
          setzIndex={setzIndex}
          setOnlineUsers={setOnlineUsers}
          setLastMessages={setLastMessages}
          onlineUsers={onlineUsers}
        />
      </div>

      {renderMenu}
    </>
  );
};

export default Sidebar;
