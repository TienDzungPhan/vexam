/**
 * Context of the Question
 * Not to be confused with the Context API
 */
import React from "react";
import { CardContent, Typography } from "@material-ui/core";
import { IContext } from "@Models/Context";

interface IProps {
  questionContext: Pick<IContext, "id" | "type" | "content">;
}

const QuestionContext: React.FC<IProps> = ({ questionContext }) => {
  return (
    <CardContent /* className={styles.questionContent} */>
      <Typography variant="body1" component="p" className="japanese">
        {questionContext.content}
      </Typography>
    </CardContent>
  );
};

export default QuestionContext;
