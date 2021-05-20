import React, { useMemo } from "react";
import avatar from "@Images/avatar.jpg";
import { Avatar } from "@material-ui/core";
import useStyles from "./UserAvatar.styles";

interface IProps {
  avatarUrl?: string;
  size: string;
}

const UserAvatar: React.FC<IProps> = ({ avatarUrl, size }) => {
  const styles = useStyles();
  const classes = useMemo(() => {
    switch (size) {
      case "small":
        return styles.small;
      case "large":
        return styles.large;
      default:
        return "";
    }
  }, [size, styles.large, styles.small]);
  return <Avatar alt="Avatar" src={avatarUrl || avatar} className={classes} />;
};

export default UserAvatar;
