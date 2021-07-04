import React  from "react";
import { Typography, Avatar } from "@material-ui/core";
import { useStyles } from "../../styles";
import { Link } from "react-router-dom";

const Follower = ({ follower, handleClose ,setLoader}) => {
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
            to={`/profile/${follower.userName}`}
            onClick={handleClose}
          >
            {follower.userName}
          </Typography>
          <Avatar src={follower?.profilePic} />
        </div>
      </div>
    </li>
  );
};

export default Follower;
