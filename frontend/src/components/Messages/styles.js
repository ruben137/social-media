import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  messagesContainer: {
    display: "flex",
    flexWrap: "wrap",
    background: "white",
  },

  bar: {
    background: "#03a9f4",
    display: "flex",
    width: "100%",
    height: 50,
    borderBottom: "1px solid #f1f2f6",
    alignItems: "center",

    padding: 5,
  },
  window: {
    width: "100%",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    scrollBehavior: "smooth",
  },
  messageText: {
    padding: 5,
    borderRadius: 5,
    margin: "0 10px",
    boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.2)",
  },
  form: {
    display: "flex",
    alignItems: "center",
    background: "#ecf0f1",
    padding: 20,
  },
  textarea: {
    width: "90%",
    height: 40,
    resize: "none",
    borderRadius: 50,
    padding: 10,
    outline: "none",
  },
  button: {
    height: "40px",
    background: "#03a9f4",
    width: "10%",
  },
  sidebarContainer: {
    height: "calc(100vh - 64px)",
    background: "white",

    zIndex: 100,
  },
  sidebarButton: {
    width: "50%",
    borderRadius: 0,
    height: 50,
    borderBottom: "1px solid #f1f2f6",
  },
  listItemContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottom: "1px solid #f1f2f6",
    "&:hover": {
      background: " #ecf0f1",
      transition: "0.3s all ease",
      cursor: "pointer",
    },
  },
  listItem: {
    marginLeft: 8,
    fontWeight: 700,
    margin: "5px",
    flexGrow: 1,
  },
  onlineUserIndicator: {
    background: "#3ae374",
    width: 10,
    height: 10,
    borderRadius: "50%",
    marginRight: 15,
  },
}));
