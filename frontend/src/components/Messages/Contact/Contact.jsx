import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "../styles";

const Contact = ({
  user,
  setShowConversations,
  setShowContacts,
  isOnline,
  createConversation,
}) => {
  const classes = useStyles();
  return (
    <div
      className={classes.listItemContainer}
      onClick={() => {
        createConversation(user.userName);

        setShowConversations(true);
        setShowContacts(false);
      }}
    >
      <Avatar src={user.profilePic} />
      <div className={classes.listItem}>
        {user.userName} <br />{" "}
        <span style={{ fontWeight: 100 }}>
          {user.description ? (
            <Typography style={{ fontSize: 14 }}>{user.description}</Typography>
          ) : (
            <Typography style={{ fontSize: 14 }}>No description</Typography>
          )}
        </span>{" "}
      </div>
      {isOnline(user.userName) && (
        <div className={classes.onlineUserIndicator}></div>
      )}
    </div>
  );
};

export default Contact;
