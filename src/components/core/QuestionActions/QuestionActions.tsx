import React, { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, CardActions } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import { IQuestion } from "@Models/Question";
import QuestionSettings from "@Modules/QuestionSettings";
import useStyles from "./QuestionActions.styles";

interface IProps {
  variant?: string;
  question: IQuestion | null;
  answered: boolean;
  selectedContent: string;
  handleReveilAnswer: () => void;
}

const Actions: React.FC<IProps> = ({
  variant,
  question,
  answered,
  selectedContent,
  handleReveilAnswer,
}) => {
  const isDetailedVariant = useMemo(() => variant === "detailed", [variant]);
  return (
    <>
      {answered ? (
        <>
          <Button
            startIcon={<ThumbUpAltOutlinedIcon />}
            size={isDetailedVariant ? "large" : "medium"}
          >
            69 Likes
          </Button>
          {!isDetailedVariant && (
            <Button
              startIcon={<QuestionAnswerIcon />}
              component={RouterLink}
              to={`/questions/${question?.id || ""}/${selectedContent}`}
            >
              159 Comments
            </Button>
          )}
          <Button
            startIcon={<BookmarkBorderOutlinedIcon />}
            size={isDetailedVariant ? "large" : "medium"}
          >
            Save
          </Button>
          {isDetailedVariant && <QuestionSettings question={question} />}
        </>
      ) : (
        <Button
          color={isDetailedVariant ? "primary" : undefined}
          variant={isDetailedVariant ? "contained" : undefined}
          startIcon={<VisibilityIcon />}
          size={isDetailedVariant ? "large" : "medium"}
          fullWidth
          onClick={handleReveilAnswer}
          disabled={!selectedContent}
        >
          Show Answer
        </Button>
      )}
    </>
  );
};

const QuestionActions: React.FC<IProps> = (props) => {
  const styles = useStyles();
  // eslint-disable-next-line react/destructuring-assignment
  return props.variant === "detailed" ? (
    <div className={styles.flexActions}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Actions {...props} />
    </div>
  ) : (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <CardActions className={styles.actions}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Actions {...props} />
    </CardActions>
  );
};

export default QuestionActions;
