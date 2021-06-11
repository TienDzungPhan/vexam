import React from "react";
import { IQuestion } from "@Models/Question";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { IComment } from "@Models/Comment";
import Comment from "@Core/Comment";
import useStyles from "./Comments.styles";

const comments: IComment[] = [
  {
    id: "1",
    author: "Dzung Phan",
    content: "Lorem ipsum dolor sit amet",
    createdAt: new Date("May 22, 2021 16:57:12"),
    updatedAt: new Date("May 25, 2021 16:57:12"),
  },
  {
    id: "2",
    parent: "1",
    author: "Thy Ho",
    content: "Amet ipsum sit lorem dolor dfdfsa ad f",
    createdAt: new Date("May 22, 2021 16:57:12"),
    updatedAt: new Date("May 25, 2021 16:57:12"),
  },
  {
    id: "3",
    parent: "1",
    author: "Nam Nguyen",
    content: "Sit dolor amet lorem ipsum",
    createdAt: new Date("May 22, 2021 16:57:12"),
    updatedAt: new Date("May 25, 2021 16:57:12"),
  },
];
interface IProps {
  question: IQuestion | null;
}

const Comments: React.FC<IProps> = () => {
  const styles = useStyles();
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
        <List dense className={styles.commentsList}>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Comments;
