import React from "react";
import { IComment } from "@Models/Comment";
import { List } from "@material-ui/core";
import Comment from "@Core/Comment";
import { IQuestion } from "@Models/Question";
import useStyles from "./CommentList.styles";

interface IProps {
  comments: IComment[];
  question: IQuestion | null;
}

const CommentList: React.FC<IProps> = ({ comments, question }) => {
  const styles = useStyles();
  return (
    <List dense className={styles.commentList}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} question={question} />
      ))}
    </List>
  );
};

export default CommentList;
