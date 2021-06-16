import React from "react";
import { IQuestion } from "@Models/Question";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import CommentList from "@Core/CommentList";
import commentsDB, { useCommentQuerySubscription } from "@Services/Comment";
import useStyles from "./Comments.styles";

interface IProps {
  question: IQuestion | null;
}

const Comments: React.FC<IProps> = ({ question }) => {
  const styles = useStyles();
  const [comments, error] = useCommentQuerySubscription(
    commentsDB
      .where("question.id", "==", question?.id || "")
      .where("parent", "==", null)
  );
  return (
    <Card>
      <CardHeader
        subheader="516 Comments"
        action={
          <IconButton>
            <FilterListIcon />
          </IconButton>
        }
      />
      <CardContent className={styles.commentsWrapper}>
        <CommentList question={question} comments={comments} />
      </CardContent>
    </Card>
  );
};

export default Comments;
