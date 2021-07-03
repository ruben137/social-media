import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from "@material-ui/icons/Close";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  Typography,
  Toolbar,
  AppBar,
  Container,
} from "@material-ui/core";
import * as actionType from "../../constants/actionTypes";
import {
  deleteNotification,
  searchUser,
  getNotifications,
  newNotification,
} from "../../actions/navigation";

import { useStyles } from "./styles";
import socket from "../Messages/SocketProvider";

export default function PrimarySearchAppBar() {
  const profilePic = useSelector((state) => state.user.profilePic);
  const notifications = useSelector((state) => state.notifications);
  const messageNotifications = notifications.filter(
    (notification) => notification.type === "message"
  );
  const search = useSelector((state) => state.search);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [searchData, setSearchData] = useState("");
  const [currentNotifications, setCurrentNotifications] = useState([]);
  const dispatch = useDispatch();

  const node = useRef();

  useEffect(() => {
    socket.emit("addUser", user?.result?.userName);
  }, [user?.result?.userName]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
  }, []);

  const handleClick = (e) => {
    if (node?.current?.contains(e.target)) {
      return;
    }
    setShowSearch(false);
  };

  useEffect(() => {
    if (!user) return;
    const getCurrentNotifications = async () => {
      await dispatch(getNotifications(user?.result?.userName));
    };
    getCurrentNotifications();
  }, [dispatch, user?.result?.userName, currentNotifications, user]);

  useEffect(() => {
    if (socket == null) return;
    const addNotification = async (notification) => {
      await setCurrentNotifications([...currentNotifications, notification]);
    };
    socket.on("get-notification", addNotification);
    return () => socket.off();
  }, [setCurrentNotifications, currentNotifications]);

  useEffect(() => {
    if (!socket) return;
    const messageNotification = async (message) => {
      if (history.location.pathname !== "/messages") {
        await dispatch(
          newNotification({
            notificationId: message.conversationId,
            type: "message",
            from: message.sender,
            to: message.receiver,
            notification: `${message.sender} send you a message`,
          })
        );

        setCurrentNotifications([
          ...currentNotifications,
          { notification: "new message", receiver: message.receiver },
        ]);
      }
    };

    socket.on("receive-message", messageNotification);

    return () => socket.off();
  }, [currentNotifications, dispatch, history.location.pathname]);

  const logout = useCallback(() => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  }, [dispatch, history]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, logout]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsProfileMenu(true);
  };

  const handleNotificationMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsProfileMenu(null);
    handleMobileMenuClose();
    setShowSearch(false);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleSearch = (e) => {
    dispatch(searchUser(e.target.value));
    setSearchData(e.target.value);

    setShowSearch(true);
  };

  const menuId = "long-menu";
  const ITEM_HEIGHT = 48;

  const renderMenu = isProfileMenu ? (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: "20ch",
        },
      }}
    >
      {user && (
        <MenuItem
          onClick={handleMenuClose}
          component={Link}
          to={`/profile/${user?.result?.userName}`}
        >
          Profile
        </MenuItem>
      )}

      {user?.result ? (
        <MenuItem onClick={logout}>Logout</MenuItem>
      ) : (
        <MenuItem component={Link} to="/auth">
          Signin
        </MenuItem>
      )}
    </Menu>
  ) : (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ maxHeight: "305px" }}
    >
      {!notifications?.length && (
        <MenuItem>You don't have notifications</MenuItem>
      )}

      {notifications.length ? (
        notifications.map((item, i) => (
          <MenuItem key={i} style={{ display: "flex" }}>
            <FavoriteIcon color="secondary" />
            <span style={{ flexGrow: 1 }}>{item.notification}</span>
            <Button>
              <CloseIcon
                onClick={async () => {
                  await dispatch(deleteNotification(item));
                }}
              />
            </Button>
          </MenuItem>
        ))
      ) : (
        <span></span>
      )}
    </Menu>
  );

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logout, user?.token]);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push("/messages");
        }}
      >
        <Button
          aria-label="show 4 new mails"
          color="inherit"
          onClick={() => {
            history.push("/messages");
          }}
        >
          <Badge badgeContent={messageNotifications.length} color="secondary">
            <MailIcon />
          </Badge>
        </Button>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleNotificationMenuOpen}>
        <Button aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={notifications?.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </Button>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Button
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar
            className={classes.purple}
            alt={user?.result.name}
            src={profilePic}
          >
            {user?.result.name.charAt(0)}
          </Avatar>
        </Button>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            className={classes.title}
            variant="h6"
            noWrap
          >
            PhotoMedia
          </Typography>
          <div className={classes.search} ref={node}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleSearch}
              onKeyPress={(e) => {
                if (e.code === "Enter") {
                  history.push(`/search/${searchData}`);
                }
              }}
              inputProps={{ "aria-label": "search" }}
            />

            <Container
              className={classes.searchContent}
              style={{ display: showSearch ? "block" : "none" }}
              ref={node}
            >
              {search.map((user) => (
                <ul className={classes.ul}>
                  <li>
                    <Typography
                      onClick={() => setShowSearch(false)}
                      component={Link}
                      to={`/profile/${user.userName}`}
                      style={{ textDecoration: "none", fontWeight: 700 }}
                    >
                      {user.userName}
                    </Typography>
                  </li>
                </ul>
              ))}
            </Container>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => history.push("/messages")}
            >
              <Badge
                badgeContent={messageNotifications.length}
                color="secondary"
              >
                <MailIcon />
              </Badge>
            </Button>
            <Button
              onClick={handleNotificationMenuOpen}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={notifications?.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </Button>
            <Button
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={profilePic}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <Button
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
