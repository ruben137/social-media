import React, { useState } from "react";

import { Fade, Paper, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useDispatch, useSelector } from "react-redux";

import { useStyles } from "../styles";
import Follower from "./Follower/Follower";

import { useInfinityScrollFollowers } from "../../../customHooks/useInfinityScroll";
import { clearFollowerState } from "../../../actions/userProfile";
import { useHookWithRefCallback } from "../../../customHooks/useRefCallback";

export default function FollowingModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userState = useSelector((state) => state.userState);
  const [skip, setSkip] = useState(0);
  const { user } = userState;

  const [open, setOpen] = useState(false);
  const { followers } = useInfinityScrollFollowers(skip, user.userName,dispatch,open);
  const [ref] = useHookWithRefCallback(setSkip);
 
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSkip(0);
    dispatch(clearFollowerState());
  };

  return (
    <>
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
              <div
                style={{ display: followers.length ? "block" : "none" }}
                ref={ref}
              />
            </ul>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}
