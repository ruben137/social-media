import React from "react";

import { Fade, Paper, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSelector } from "react-redux";

import { useStyles } from "../styles";
import Follower from "./Follower/Follower";

export default function FollowingModal() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const { followers } = user;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p
        align="center"
        style={{ fontWeight: 700, cursor: "pointer" }}
        onClick={handleOpen}
      >
        {user?.followers?.length}
        <br /> <span style={{ fontWeight: 300 }}>followers</span>{" "}
      </p>
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
          <Paper
            className={classes.followers}
            style={{
              overflowY: followers?.length >= 7 ? "scroll" : "unset",
            }}
          >
            <Typography style={{ fontWeight: 700 }} align="center">
              Followers
            </Typography>
            <ul style={{ margin: 0, padding: 10 }}>
              {followers?.map((follower, i) => (
                <Follower
                  follower={follower}
                  handleClose={handleClose}
                  key={i}
                />
              ))}
            </ul>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
