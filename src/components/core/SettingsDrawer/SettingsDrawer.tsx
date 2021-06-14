import React, { useState } from "react";
import firebase from "@Config/firebase";
import {
  Divider,
  IconButton,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import UserAvatar from "@Core/UserAvatar";
import SettingsList from "@Core/SettingsList";
import { IUser } from "@Models/User";
import useStyles from "./SettingsDrawer.styles";

interface IProps {
  user: firebase.User | null;
  userData: IUser | null;
}

const SettingsDrawer: React.FC<IProps> = ({ user, userData }) => {
  const styles = useStyles();
  const [opened, setOpened] = useState(false);
  const handleOpen = () => {
    setOpened(true);
  };
  const handleClose = () => {
    setOpened(false);
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <UserAvatar
          avatarUrl={user?.photoURL || ""}
          name={userData?.name || ""}
          size="small"
        />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={opened}
        onOpen={handleOpen}
        onClose={handleClose}
        className={styles.rightDrawer}
      >
        <div className={styles.userInfo}>
          <UserAvatar
            avatarUrl={user?.photoURL || ""}
            name={userData?.name || ""}
            size="x-large"
          />
          <Typography variant="h6">{userData?.name}</Typography>
        </div>
        <Divider variant="middle" />
        <SettingsList userData={userData} closeSettings={handleClose} />
      </SwipeableDrawer>
    </>
  );
};

export default SettingsDrawer;
