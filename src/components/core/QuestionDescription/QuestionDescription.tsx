import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@material-ui/core";
import { IQuestion } from "@Models/Question";
import UserAvatar from "@Core/UserAvatar";
import { timePast } from "@Helpers/time";
import QuestionSettings from "@Modules/QuestionSettings";
import useStyles from "./QuestionDescription.styles";

interface IProps {
  variant?: string;
  question: IQuestion | null;
}

const Description: React.FC<IProps> = ({ variant, question }) => {
  const styles = useStyles();
  return (
    <>
      <CardHeader
        avatar={
          <UserAvatar
            name={question?.author.name || ""}
            size={variant === "detailed" ? "medium" : "small"}
          />
        }
        action={
          variant === "detailed" ? (
            <Button variant="outlined" color="primary" size="small">
              Follow
            </Button>
          ) : (
            <QuestionSettings question={question} />
          )
        }
        title={
          <>
            <Typography component="span" variant="body1">
              <Link
                color="inherit"
                component={RouterLink}
                to={`/profile/${question?.author.id || ""}`}
              >
                {question?.author.name}
              </Link>
            </Typography>
            ・
            <Typography component="span" variant="caption">
              {timePast(question?.updatedAt.toDate() || new Date())}
            </Typography>
          </>
        }
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
