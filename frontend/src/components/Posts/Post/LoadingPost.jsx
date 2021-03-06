import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,

} from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

const LoadingPost = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Container className={classes.container}>
        <Card
          style={{
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <CircularProgress />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoadingPost;
