import React, { useContext, useEffect, useMemo, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import SaveIcon from "@material-ui/icons/Save";
import { IQuestion } from "@Models/Question";
import { AuthContext } from "@Contexts/AuthContext";
import { IComment } from "@Models/Comment";
import { createNewComment, updateComment } from "@Services/Comment";
import useStyles from "./CommentForm.styles";

interface IProps {
  comment?: IComment | null;
  question: IQuestion | null;
  parent?: IComment;
  handleFormHide?: () => void;
}

const CommentForm: React.FC<IProps> = ({
  comment,
  question,
  parent,
  handleFormHide,
}) => {
  const styles = useStyles();
  const isReply = useMemo(() => Boolean(parent), [parent]);
  const { userData } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const commentData = useMemo(() => {
    // Use the root comment as the parent of the comment
    const rootParent = (parent?.parent ? parent.parent : parent) || null;
    const data = {
      question: { id: question?.id || "" },
      author: { id: userData?.id || "", name: userData?.name || "" },
      content,
      parent: rootParent,
    };
    return data;
  }, [content, parent, question, userData]);
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleCommentCreate = async () => {
    try {
      await createNewComment(commentData);
      setContent("");
      if (isReply && handleFormHide) handleFormHide();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const handleCommentUpdate = async () => {
    if (comment) {
      try {
        await updateComment(comment.id, { content });
        setContent("");
        if (handleFormHide) handleFormHide();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (comment) {
      setContent(comment.content);
    }
  }, [comment]);
  return (
    <TextField
      className={styles.commentInput}
      id="comment-input"
      label={`${isReply ? "Reply" : "Comment"} as ${userData?.name}`}
      variant="outlined"
      fullWidth
      multiline
      size={isReply ? "small" : "medium"}
      value={content}
      onChange={handleContentChange}
      placeholder={isReply ? "" : "What do you think about this question?"}
      InputProps={{
        // startAdornment: (
        //   <InputAdornment position="start">
        //     {parent && `@${parent.author.name}`}
        //   </InputAdornment>
        // ),
        endAdornment: (
          <InputAdornment position="end">
            {isReply && (
              <IconButton size="small" onClick={handleFormHide}>
                <CloseIcon />
              </IconButton>
            )}
            <IconButton
              size={isReply ? "small" : "medium"}
              onClick={comment ? handleCommentUpdate : handleCommentCreate}
              disabled={!content}
            >
              {comment ? <SaveIcon /> : <SendIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CommentForm;
