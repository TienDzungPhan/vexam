import React from "react";
import { Link as RouterLink } from "react-router-dom";
import UserAvatar from "@Core/UserAvatar";
import {
  Button,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { IUser } from "@Models/User";
import useStyles from "./UserHeadline.styles";

interface IProps {
  isCurrentUser: boolean;
  userData: IUser | null;
}

const UserHeadline: React.FC<IProps> = ({ isCurrentUser, userData }) => {
  const styles = useStyles();
  return (
    <Card>
      <CardHeader
        className={styles.headline}
        avatar={<UserAvatar name={userData?.name} size="x-large" />}
        title={<Typography variant="h4">{userData?.name}</Typography>}
        subheader={
          <>
            <strong>{userData?.followersCount}</strong> Followers・
            <strong>{userData?.questionsCount}</strong> Questions
          </>
        }
        action={
          isCurrentUser ? (
            <IconButton component={RouterLink} to="/settings">
              <SettingsIcon />
            </IconButton>
          ) : (
            <Button variant="outlined" color="primary">
              Follow
            </Button>
          )
        }
      />
    </Card>
  );
};

export default UserHeadline;
