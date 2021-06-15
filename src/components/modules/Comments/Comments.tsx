import React, { useCallback, useEffect, useState } from "react";
import { IQuestion } from "@Models/Question";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { IComment } from "@Models/Comment";
import CommentList from "@Core/CommentList";
import commentsDB, { getComments } from "@Services/Comment";
import useStyles from "./Comments.styles";

interface IProps {
  question: IQuestion | null;
}

const Comments: React.FC<IProps> = ({ question }) => {
  const styles = useStyles();
  const [comments, setComments] = useState<IComment[]>([]);
  const loadComments = useCallback(async () => {
    if (question) {
      try {
        const data = await getComments(
          commentsDB
            .where("question.id", "==", question.id)
            .where("parent", "==", null)
        );
        setComments(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }, [question]);
  useEffect(() => {
    loadComments();
  }, [loadComments]);
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
