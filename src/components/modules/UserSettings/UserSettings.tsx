import React, { useState } from "react";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LanguageIcon from "@material-ui/icons/Language";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserAvatar from "@Core/UserAvatar";
import useStyles from "./UserSettings.styles";

const UserSettings: React.FC = () => {
  const styles = useStyles();
  const currentUser = { username: "Dzung Phan" };
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-settings-popover" : undefined;

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<UserAvatar size="small" />}
        endIcon={<ArrowDropDownIcon />}
        className={styles.button}
        onClick={handleClick}
      >
        {currentUser?.username}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={styles.popover}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default UserSettings;
