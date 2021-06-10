import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, Typography } from "@material-ui/core";
import * as api from "../../api";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

export default function TransitionsModal({
  conversationId,
  messageTo,
  setConversations,
  setMessageTo,
  members,
  messages,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteConversation = async (id) => {
    try {
      const { data } = await api.deleteConversation(id);

      setConversations(data);

      setMessageTo(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteConversationFromDb = async (id) => {
    try {
      const { data } = await api.deleteConversationFromDb(id);
      setConversations(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMessages = async () => {
    try {
      await api.deleteMessages(conversationId, messageTo);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessagesFromDb = async () => {
    try {
      await api.deleteMessagesFromDb(conversationId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Typography type="button" onClick={handleOpen}>
        Delete conversation
      </Typography>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2
              style={{ width: "100%", textAlign: "center" }}
              id="transition-modal-title"
            >
              Are you sure you want to delete this conversation?
            </h2>
            <Button
              style={{ background: "#4cd137", margin: "0 5px" }}
              onClick={(e) => {
                handleClose(e);
                if (members.length < 2) {
                  deleteConversationFromDb(conversationId);
                } else {
                  deleteConversation(conversationId);
                }
                if (members.length < 2 && messages.length) {
                  deleteMessagesFromDb();
                }
                if (members.length > 1 && messages.length) {
                  deleteMessages();
                }
              }}
            >
              Yes
            </Button>
            <Button
              style={{ background: "#ee5253", margin: "0 5px" }}
              onClick={handleClose}
            >
              No
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
