import React  from "react";
import { useStyles } from "../../styles";
import { Typography, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const UserFollowing = ({ handleClose, following }) => {
  const classes = useStyles();

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
            to={`/profile/${following.userName}`}
            onClick={handleClose}
          >
            {following.userName}
          </Typography>
          <Avatar src={following.profilePic} />
        </div>
      </div>
    </li>
  );
};

export default UserFollowing;
