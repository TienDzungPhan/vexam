import React, { useContext } from "react";
import SettingsDrawer from "@Core/SettingsDrawer";
import SettingsDropdown from "@Core/SettingsDropdown";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { AuthContext } from "@Contexts/AuthContext";

const UserSettings: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { user, userData } = useContext(AuthContext);
  return isDesktop ? (
    <SettingsDropdown user={user} userData={userData} />
  ) : (
    <SettingsDrawer user={user} userData={userData} />
  );
};

export default UserSettings;
