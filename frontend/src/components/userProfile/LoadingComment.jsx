import { Avatar, Button, Typography } from "@material-ui/core";
import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const LoadingComment = ({ user }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: 8,
        flexWrap: "wrap",
      }}
    >
      <Avatar src={user.result.profilePic} />
      <Typography
        style={{
          fontWeight: 700,
          marginLeft: 5,
        }}
      >
        {user?.result?.userName}
      </Typography>
      <span
        style={{
          marginLeft: 5,
          color: "#9e9e9e",
          width: "100%",
        }}
      >
        now
      </span>
      <Typography style={{ marginLeft: 5 }}>loading comment...</Typography>

      <div
        style={{
          width: "100%",
          border: "1px solid #f1f2f6",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button style={{ position: "relative" }} disabled={true}>
          <>
            <FavoriteBorderIcon fontSize="small" color="secondary" />
            <span
              style={{
                position: "absolute",
                right: 3,
                fontSize: "15px",
              }}
            ></span>
          </>
        </Button>
        <Button>
          <MoreVertIcon />
        </Button>
      </div>
    </div>
  );
};

export default LoadingComment;
