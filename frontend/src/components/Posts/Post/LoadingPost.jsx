import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

const LoadingPost = ({ user }) => {
  const classes = useStyles();
  return (
    <div>
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
              {!user.following?.length ? (
                <Typography style={{ fontSize: 30 }}>
                  Start following people to see their posts!
                </Typography>
              ) : (
                <CircularProgress />
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </div>
  );
};

export default LoadingPost;
