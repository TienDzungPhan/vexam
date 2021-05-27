import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import { IQuestion } from "@Models/Question";
import UserAvatar from "@Core/UserAvatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { timePast } from "@Helpers/time";
import useStyles from "./QuestionDescription.styles";

interface IProps {
  variant?: string;
  question: IQuestion;
}

const Description: React.FC<IProps> = ({ question }) => {
  const styles = useStyles();
  return (
    <>
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
    </>
  );
};

const QuestionDescription: React.FC<IProps> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  return props.variant === "detailed" ? (
    <Card>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Description {...props} />
    </Card>
  ) : (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <Description {...props} />
  );
};

export default QuestionDescription;
