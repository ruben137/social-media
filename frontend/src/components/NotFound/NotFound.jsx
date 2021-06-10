import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useStyles } from "./styles";
const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <div>
          <div className={classes.textContainer}>
            <h3 className={classes.error}>Error 404 </h3>
            <ErrorOutlineIcon />
          </div>
          <p>This page doesn't exist</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
