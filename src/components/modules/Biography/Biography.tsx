import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UserAvatar from "@Core/UserAvatar";
import useStyles from "./Biography.styles";

const Biography: React.FC = () => {
  const styles = useStyles();
  return (
    <Card>
      <CardHeader
        avatar={<UserAvatar />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Dzung Phan"
      />
      <CardContent className={styles.content}>
        <List>
          <ListItem>
            <Typography variant="body2" component="span">
              Studying
            </Typography>
            <Typography
              variant="h6"
              component="span"
              className={styles.floatRight}
            >
              JLPT N5
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" component="span">
              Questions
            </Typography>
            <Typography
              variant="h6"
              component="span"
              className={styles.floatRight}
            >
              99
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" component="span">
              Followers
            </Typography>
            <Typography
              variant="h6"
              component="span"
              className={styles.floatRight}
            >
              69
            </Typography>
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" color="primary">
          Follow
        </Button>
      </CardActions>
    </Card>
  );
};

export default Biography;
