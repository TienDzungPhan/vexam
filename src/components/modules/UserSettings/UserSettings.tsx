import React, { useState } from "react";
import { Button, IconButton, Popover, Drawer } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import UserAvatar from "@Core/UserAvatar";
import SettingsList from "@Core/SettingsList";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./UserSettings.styles";

const SettingsDropdown: React.FC = () => {
  const styles = useStyles();
  const currentUser = { username: "Dzung Phan" };
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        onClick={handleOpen}
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
        <SettingsList closeSettings={handleClose} />
      </Popover>
    </>
  );
};

const SettingsDrawer: React.FC = () => {
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
        <UserAvatar size="small" />
      </IconButton>
      <Drawer anchor="right" open={opened} onClose={handleClose}>
        <SettingsList closeSettings={handleClose} />
      </Drawer>
    </>
  );
};

const UserSettings: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return isDesktop ? <SettingsDropdown /> : <SettingsDrawer />;
};

export default UserSettings;
