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
import useStyles from "./NavBar.styles";

const NavBar: React.FC = () => {
  const styles = useStyles();
  return (
    <AppBar className={styles.navBar} position="fixed">
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
          <Button color="inherit" className={styles.user}>
            Log In
          </Button>
          <Button color="inherit">Sign Up</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
