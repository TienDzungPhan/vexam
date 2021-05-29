import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SearchIcon from "@material-ui/icons/Search";
import SearchBar from "@Modules/SearchBar";
import UserSettings from "@Modules/UserSettings";
import { DialogContext } from "@Contexts/DialogContext";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./NavBar.styles";

const BottomNavBar: React.FC = () => {
  const styles = useStyles();
  return (
    <AppBar position="fixed" color="default" className={styles.bottomNavBar}>
      <Toolbar className={styles.toolbar}>
        <IconButton component={RouterLink} to="/">
          <HomeIcon />
        </IconButton>
        <IconButton>
          <AssignmentIcon />
        </IconButton>
        <IconButton component={RouterLink} to="/questions/create">
          <AddIcon />
        </IconButton>
        <IconButton>
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const NavBar: React.FC = () => {
  const styles = useStyles();
  const { handleDialogOpen } = useContext(DialogContext);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <AppBar position="fixed" color="transparent" className={styles.navBar}>
        <Toolbar className={styles.toolbar}>
          <Button color="inherit" component={RouterLink} to="/">
            <Typography
              className="brand"
              variant="h4"
              color="textPrimary"
              noWrap
            >
              Vexam
            </Typography>
          </Button>
          {isDesktop && <SearchBar />}
          <div className={styles.menu}>
            {/* <IconButton component={RouterLink} to="/questions/create">
            <AddIcon />
          </IconButton>
          <IconButton>
            <AssignmentIcon />
          </IconButton>
          <IconButton>
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <UserSettings /> */}
            <Button
              variant="contained"
              color="primary"
              className={styles.button}
              onClick={handleDialogOpen("log-in")}
            >
              Log In
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDialogOpen("sign-up")}
            >
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {!isDesktop && <BottomNavBar />}
    </>
  );
};

export default NavBar;
