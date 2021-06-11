import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LanguageIcon from "@material-ui/icons/Language";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import UserAvatar from "@Core/UserAvatar";
import { logOut } from "@Config/auth";

interface IProps {
  closeSettings: () => void;
}

const SettingsList: React.FC<IProps> = ({ closeSettings }) => {
  const handleLogOut = async () => {
    closeSettings();
    try {
      await logOut();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <>
      <List>
        <ListItem
          button
          component={RouterLink}
          to="/profile/1"
          onClick={closeSettings}
        >
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
      <Divider variant="middle" />
      <List>
        <ListItem button onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </>
  );
};

export default SettingsList;
