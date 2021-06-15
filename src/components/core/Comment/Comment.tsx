import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import UserAvatar from "@Core/UserAvatar";
import { timePast } from "@Helpers/time";
import CommentList from "@Core/CommentList";
import CommentForm from "@Modules/CommentForm";
import commentsDB, { getComments } from "@Services/Comment";
import useStyles from "./Comment.styles";

const Comment: React.FC<IProps> = ({ comment, question }) => {
  const styles = useStyles();
  const isReply = useMemo(() => Boolean(comment?.parent), [comment]);
  const [replies, setReplies] = useState<IComment[]>([]);
  const [repliesOpened, setRepliesOpened] = useState(false);
  const [replyFormOpened, setReplyFormOpened] = useState(false);
  const handleRepliesToggle = () => {
    setRepliesOpened(!repliesOpened);
  };
  const handleReplyFormOpen = () => {
    setReplyFormOpened(true);
  };
  const handleReplyFormClose = () => {
    setReplyFormOpened(false);
  };
  const loadReplies = useCallback(async () => {
    if (comment && repliesOpened) {
      try {
        const data = await getComments(
          commentsDB.where("parent.id", "==", comment.id)
        );
        setReplies(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }, [comment, repliesOpened]);
  useEffect(() => {
    loadReplies();
  }, [loadReplies]);
  return (
    <>
      <ListItem
        alignItems="flex-start"
        className={clsx(isReply && styles.reply)}
      >
        <ListItemAvatar className={styles.avatarWrapper}>
          <UserAvatar
            name={comment?.author.name}
            size={isReply ? "small" : "medium"}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography component="span" variant="subtitle2">
                <Link
                  color="inherit"
                  component={RouterLink}
                  to={`/profile/${comment?.author.id || ""}`}
                >
                  {comment?.author.name}
                </Link>
              </Typography>
              ・
              <Typography component="span" variant="caption">
                {timePast(comment?.updatedAt.toDate() || new Date())}
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
                {comment?.content}
              </Typography>
              <Button startIcon={<ThumbUpAltOutlinedIcon />} size="small">
                {comment?.likesCount}
              </Button>
              <Button
                startIcon={<ChatBubbleIcon />}
                size="small"
                onClick={handleReplyFormOpen}
              >
                Reply
              </Button>
              <Button startIcon={<MoreVertIcon />} size="small">
                More
              </Button>
              {replyFormOpened && (
                <CommentForm
                  question={question}
                  parent={comment}
                  handleFormHide={handleReplyFormClose}
                />
              )}
              {!isReply && (
                <Button
                  fullWidth
                  variant="text"
                  color="inherit"
                  size="small"
                  startIcon={
                    repliesOpened ? <ExpandLessIcon /> : <ExpandMoreIcon />
                  }
                  className={styles.showReplyButton}
                  onClick={handleRepliesToggle}
                >
                  {repliesOpened ? "Hide replies" : "Show replies"}
                </Button>
              )}
            </>
          }
        />
      </ListItem>
      {!isReply && repliesOpened && (
        <CommentList question={question} comments={replies} />
      )}
    </>
  );
};

export default Comment;
