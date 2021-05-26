import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { IQuestion } from "@Models/Question";
import UserAvatar from "@Core/UserAvatar";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import { timePast } from "@Helpers/time";
import QuestionContent from "@Core/QuestionContent";
import useStyles from "./Question.styles";

interface IProps {
  question: IQuestion;
}

const Question: React.FC<IProps> = ({ question }) => {
  const styles = useStyles();
  const [answered, setAnswered] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const handleReveilAnswer = () => {
    setAnswered(true);
  };
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedContent(e.target.value);
  };
  return (
    <Card className={styles.question}>
      <div className={styles.upperHeader}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          disableElevation
          className={styles.upperButton}
        >
          <Typography noWrap>{question?.exam}</Typography>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          disableElevation
          className={styles.upperButton}
        >
          <Typography noWrap>{question?.category}</Typography>
        </Button>
      </div>
      <CardHeader
        avatar={<UserAvatar size="small" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${question?.author}・${timePast(question?.updatedAt)}`}
        className={styles.header}
      />
      <CardContent className={styles.description}>
        <Typography variant="body2" color="textSecondary" component="p">
          {question?.description}
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <QuestionContent
        question={question}
        answered={answered}
        selectedContent={selectedContent}
        handleOptionChange={handleOptionChange}
      />
      <CardActions className={styles.actions}>
        {answered ? (
          <>
            <Button startIcon={<ThumbUpAltOutlinedIcon />}>69 Likes</Button>
            <Button
              startIcon={<QuestionAnswerIcon />}
              component={RouterLink}
              to="/questions/1"
            >
              159 Comments
            </Button>
            <Button startIcon={<BookmarkBorderOutlinedIcon />}>Save</Button>
          </>
        ) : (
          <Button
            startIcon={<VisibilityIcon />}
            fullWidth
            onClick={handleReveilAnswer}
            disabled={!selectedContent}
          >
            Show Answer
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Question;
