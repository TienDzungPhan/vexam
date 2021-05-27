import React, { useMemo } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import { IComment } from "@Models/Comment";
import {
  Button,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import UserAvatar from "@Core/UserAvatar";
import { timePast } from "@Helpers/time";
import useStyles from "./Comment.styles";

interface IProps {
  comment: IComment;
}

const Comment: React.FC<IProps> = ({ comment }) => {
  const styles = useStyles();
  const isReply = useMemo(() => Boolean(comment.parent), [comment]);
  return (
    <>
      <ListItem
        key={comment.id}
        alignItems="flex-start"
        className={clsx(isReply && styles.reply)}
      >
        <ListItemAvatar className={styles.avatarWrapper}>
          <UserAvatar size={isReply ? "small" : "medium"} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography component="span" variant="subtitle2">
                <Link color="inherit" component={RouterLink} to="/profile/1">
                  {comment.author}
                </Link>
              </Typography>
              ・
              <Typography component="span" variant="caption">
                {timePast(comment.updatedAt)}
              </Typography>
            </>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body1"
                className={styles.content}
                color="textPrimary"
              >
                {comment.content}
              </Typography>
              <Button startIcon={<ThumbUpAltOutlinedIcon />} size="small">
                69
              </Button>
              <Button startIcon={<ChatBubbleIcon />} size="small">
                Reply
              </Button>
              <Button startIcon={<MoreVertIcon />} size="small">
                More
              </Button>
            </>
          }
        />
      </ListItem>
    </>
  );
};

export default Comment;
