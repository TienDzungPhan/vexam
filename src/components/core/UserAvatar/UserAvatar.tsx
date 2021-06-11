import React, { useMemo } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from "clsx";
import { Avatar } from "@material-ui/core";
import useStyles from "./UserAvatar.styles";

interface IProps {
  name?: string;
  avatarUrl?: string;
  size?: string;
}

const UserAvatar: React.FC<IProps> = ({ name, avatarUrl, size }) => {
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
  const initial = useMemo(() => name && name[0].toUpperCase(), [name]);
  return avatarUrl ? (
    <Avatar alt="Avatar" src={avatarUrl} className={classes} />
  ) : (
    <Avatar className={classes}>{initial}</Avatar>
  );
};

export default UserAvatar;
