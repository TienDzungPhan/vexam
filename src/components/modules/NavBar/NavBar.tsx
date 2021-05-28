import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SearchBar from "@Modules/SearchBar";
import UserSettings from "@Modules/UserSettings";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./NavBar.styles";

const NavBar: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <AppBar position="fixed" color="transparent" className={styles.navBar}>
      <Toolbar className={styles.toolbar}>
        <Button color="inherit" component={RouterLink} to="/">
          <Typography variant="h6" color="textPrimary" noWrap>
            JapanExam
          </Typography>
        </Button>
        {isDesktop && <SearchBar />}
        <div className={styles.menu}>
          {isDesktop && (
            <>
              <IconButton component={RouterLink} to="/questions/create">
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
            </>
          )}
          <UserSettings />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
