import React, { useState } from "react";
import firebase from "@Config/firebase";
import { Button, Popover } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import UserAvatar from "@Core/UserAvatar";
import SettingsList from "@Core/SettingsList";
import { IUser } from "@Models/User";
import useStyles from "./SettingsDropdown.styles";

interface IProps {
  user: firebase.User | null;
  userData: IUser | null;
}

const SettingsDropdown: React.FC<IProps> = ({ user, userData }) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "user-settings-popover" : undefined;
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={
          <UserAvatar
            avatarUrl={user?.photoURL || ""}
            name={userData?.name || ""}
            size="small"
          />
        }
        endIcon={<ArrowDropDownIcon />}
        className={styles.button}
        onClick={handleOpen}
      >
        {userData?.name}
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
        <SettingsList userData={userData} closeSettings={handleClose} />
      </Popover>
    </>
  );
};

export default SettingsDropdown;
