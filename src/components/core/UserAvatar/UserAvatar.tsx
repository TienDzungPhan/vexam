import React, { useMemo } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from "clsx";
import avatar from "@Images/avatar.jpg";
import { Avatar } from "@material-ui/core";
import useStyles from "./UserAvatar.styles";

interface IProps {
  avatarUrl?: string;
  size?: string;
}

const UserAvatar: React.FC<IProps> = ({ avatarUrl, size }) => {
  const styles = useStyles();
  const classes = useMemo(() => {
    const classList = [styles.avatar];
    switch (size) {
      case "small":
        classList.push(styles.small);
        break;
      case "large":
        classList.push(styles.large);
        break;
      case "x-large":
        classList.push(styles.xlarge);
        break;
      case "medium":
      default:
        break;
    }
    return clsx(classList);
  }, [size, styles]);
  return <Avatar alt="Avatar" src={avatarUrl || avatar} className={classes} />;
};

export default UserAvatar;
