import React, { useContext, useMemo, useState } from "react";
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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import UserAvatar from "@Core/UserAvatar";
import { timePast } from "@Helpers/time";
import CommentForm from "@Modules/CommentForm";
import { IQuestion } from "@Models/Question";
import Replies from "@Modules/Replies";
import { AuthContext } from "@Contexts/AuthContext";
import { deleteComment } from "@Services/Comment";
import useStyles from "./Comment.styles";

interface IProps {
  comment: IComment;
  question: IQuestion | null;
}

const Comment: React.FC<IProps> = ({ comment, question }) => {
  const styles = useStyles();
  const { userData } = useContext(AuthContext);
  const isAuthor = useMemo(
    () => userData?.id === comment?.author.id,
    [userData, comment]
  );
  const isReply = useMemo(() => Boolean(comment?.parent), [comment]);
  const [repliesOpened, setRepliesOpened] = useState(false);
  const [replyFormOpened, setReplyFormOpened] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<IComment | null>(null);
  const handleRepliesToggle = () => {
    setRepliesOpened(!repliesOpened);
  };
  const handleReplyFormOpen = () => {
    setReplyFormOpened(true);
  };
  const handleReplyFormClose = () => {
    setReplyFormOpened(false);
  };
  const handleCommentEdit = () => {
    setCommentToEdit(comment);
    handleReplyFormOpen();
  };
  const handleCommentDelete = async () => {
    try {
      await deleteComment(comment.id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <>
      <ListItem alignItems="flex-start">
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
              {isAuthor && (
                <>
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={handleCommentEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    size="small"
                    onClick={handleCommentDelete}
                  >
                    Delete
                  </Button>
                </>
              )}
              {replyFormOpened && (
                <CommentForm
                  comment={commentToEdit}
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
        <Replies question={question} parent={comment} />
      )}
    </>
  );
};

export default Comment;
