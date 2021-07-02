import React from 'react';

import { Fade, Paper, Typography, Avatar } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {useStyles }from '../styles'



export default function FollowingModal() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const followers = users.filter((follower) =>
    user?.followers?.includes(follower.userName)
  );

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
          overflowY: followers.length >= 7 ? "scroll" : "unset",
       
        }}
      >
        <Typography style={{ fontWeight: 700 }} align="center">
          Followers
        </Typography>
        <ul style={{ margin: 0, padding: 10 }}>
          {followers.map((follower, i) => (
            <li className={classes.li} key={i}>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "black",
                    }}
                    variant="body2"
                    component={Link}
                    to={`/profile/${follower.userName}`}
                    onClick={handleClose}
                  >
                    {follower.userName}
                  </Typography>
                  <Avatar src={follower.profilePic} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Paper>
        </Fade>
      </Modal>
    </div>
  );
}