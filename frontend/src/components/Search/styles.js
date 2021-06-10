import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 10,
    height: "calc(100vh - 74px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    width: "40%",
    display: "flex",
    alignItems: "center",
    padding: 5,
  },
  username: {
    marginLeft: 5,
    textDecoration: "none",
    fontWeight: 700,
    color: "black",
  },
}));
