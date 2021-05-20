import React from "react";
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
import UserSettings from "@Modules/UserSettings";
import useStyles from "./NavBar.styles";

const NavBar: React.FC = () => {
  const styles = useStyles();
  return (
    <AppBar position="fixed" color="transparent" className={styles.navBar}>
      <Toolbar>
        <Button color="inherit">
          <Typography variant="h6" color="textPrimary" noWrap>
            JapanExam
          </Typography>
        </Button>
        <div className={styles.menu}>
          <IconButton>
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
          <UserSettings />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
