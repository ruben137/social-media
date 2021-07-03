import React from "react";
import { Fade, Paper, Typography} from "@material-ui/core";
import UserFollowing from "./UserFollowing/UserFollowing";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useStyles } from "../styles";
import { useSelector } from "react-redux";

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.user);
  const {following}=user


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
            </ul>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
