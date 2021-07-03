import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core";
 

import { useStyles } from "../../styles";

const NoPosts = () => {
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
            <Typography style={{ fontSize: 30 }}>
              Start following people to see their posts!
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default NoPosts;
