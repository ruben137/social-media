import React, { useState } from "react";
import { Fade, Paper, Typography} from "@material-ui/core";
import UserFollowing from "./UserFollowing/UserFollowing";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useStyles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { clearFollowerState, getFollowing } from "../../../actions/userProfile";
import { useInfinityScrollFollowing } from "../../../customHooks/useInfinityScroll";
import { useHookWithRefCallback } from "../../../customHooks/useRefCallback";

export default function TransitionsModal() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [open, setOpen] = useState(false);
   const [skip, setSkip] = useState(0);
  const userState = useSelector((state) => state.userState);
  const {user}=userState
  const {following}=useInfinityScrollFollowing(skip,user.userName,dispatch,open)
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
    <div>
      <p
        align="center"
        style={{ fontWeight: 700, cursor: "pointer" }}
        onClick={handleOpen}
      >
        {user?.following?.length}
        <br /> <span style={{ fontWeight: 300 }}>following</span>{" "}
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
          <Paper className={classes.followers}>
            <Typography style={{ fontWeight: 700 }} align="center">
              Following
            </Typography>
            <ul
              style={{
                margin: 0,
                padding: 10,
                overflowY: following?.length >= 7 ? "scroll" : "unset",
              }}
            >
              {following?.map((following,i) => (
              <UserFollowing following={following} handleClose={handleClose} key={i}/>
              ))}
              <div 
              style={{ display: following?.length ? "block" : "none" }}
              ref={ref}/>
            </ul>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
