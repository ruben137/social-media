import React, { useEffect } from "react";
import { Typography, Avatar } from "@material-ui/core";
import { useStyles } from "../../styles";
import { Link } from "react-router-dom";
import { getProfilePic } from "../../../../actions/userProfile";
import { useDispatch, useSelector } from "react-redux";
const Follower = ({follower,handleClose}) => {
  const classes = useStyles();
    const dispatch=useDispatch()
  const userPostsState = useSelector((state) => state.userPosts);
  const { users } = userPostsState;
  const user = users.find((user) => user.name === follower);
  useEffect(()=>{
    dispatch(getProfilePic(follower))
  },[dispatch,follower])

  return (
    <li className={classes.li}>
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
            to={`/profile/${follower}`}
            onClick={handleClose}
          >
            {follower}
          </Typography>
          <Avatar src={user?.profilePic} />
        </div>
      </div>
    </li>
  );
};

export default Follower;
