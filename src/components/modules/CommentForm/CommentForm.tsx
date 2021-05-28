import React from "react";
import UserAvatar from "@Core/UserAvatar";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import useStyles from "./CommentForm.styles";

const CommentForm: React.FC = () => {
  const styles = useStyles();
  return (
    <TextField
      className={styles.commentInput}
      id="comment-input"
      label="Write Comment"
      variant="outlined"
      fullWidth
      multiline
      placeholder="What do you think about this question?"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <UserAvatar size="small" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Button>Post</Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CommentForm;
