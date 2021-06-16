import React from "react";
import CommentList from "@Core/CommentList";
import { IComment } from "@Models/Comment";
import { IQuestion } from "@Models/Question";
import commentsDB, { useCommentQuerySubscription } from "@Services/Comment";
import useStyles from "./Replies.styles";

interface IProps {
  question: IQuestion | null;
  parent: IComment | null;
}

const Replies: React.FC<IProps> = ({ question, parent }) => {
  const styles = useStyles();
  const [replies, error] = useCommentQuerySubscription(
    commentsDB.where("parent.id", "==", parent?.id || "")
  );
  return (
    <div className={styles.replies}>
      <CommentList question={question} comments={replies} />
    </div>
  );
};

export default Replies;
