import React, { useMemo } from "react";
import { IQuestion } from "@Models/Question";
import { Button, Typography } from "@material-ui/core";
import useStyles from "./QuestionCategory.styles";

interface IProps {
  variant?: string;
  question: IQuestion;
}

const QuestionCategory: React.FC<IProps> = ({ variant, question }) => {
  const isDetailedVariant = useMemo(() => variant === "detailed", [variant]);
  const styles = useStyles({ isDetailedVariant });
  return (
    <div className={isDetailedVariant ? "" : styles.categorySection}>
      <Button
        variant="contained"
        color="primary"
        size={isDetailedVariant ? "medium" : "small"}
        disableElevation
        className={styles.upperButton}
      >
        <Typography noWrap>{question?.exam}</Typography>
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size={isDetailedVariant ? "medium" : "small"}
        disableElevation
        className={styles.upperButton}
      >
        <Typography noWrap>{question?.category}</Typography>
      </Button>
    </div>
  );
};

export default QuestionCategory;
