import React, { useContext, useMemo, useState } from "react";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import { IQuestion } from "@Models/Question";
import { AuthContext } from "@Contexts/AuthContext";
import { IComment } from "@Models/Comment";
import { createNewComment } from "@Services/Comment";
import useStyles from "./CommentForm.styles";

interface IProps {
  question: IQuestion | null;
  parent?: IComment;
  handleFormHide?: () => void;
}

const CommentForm: React.FC<IProps> = ({
  question,
  parent,
  handleFormHide,
}) => {
  const styles = useStyles();
  const isReply = useMemo(() => Boolean(parent), [parent]);
  const { userData } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const commentData = useMemo(() => {
    const data = {
      question: { id: question?.id || "" },
      author: { id: userData?.id || "", name: userData?.name || "" },
      content: comment,
      parent: parent ? { id: parent.id } : null,
    };
    return data;
  }, [comment, parent, question, userData]);
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const handleCommentCreate = async () => {
    try {
      await createNewComment(commentData);
      setComment("");
      if (isReply && handleFormHide) handleFormHide();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <TextField
      className={styles.commentInput}
      id="comment-input"
      label={`Comment as ${userData?.name}`}
      variant="outlined"
      fullWidth
      multiline
      size={isReply ? "small" : "medium"}
      value={comment}
      onChange={handleCommentChange}
      placeholder="What do you think about this question?"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isReply && (
              <Button size="small" onClick={handleFormHide}>
                Cancel
              </Button>
            )}
            <Button
              size={isReply ? "small" : "medium"}
              onClick={handleCommentCreate}
            >
              Post
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CommentForm;
