/**
 * Context of the Question
 * Not to be confused with the Context API
 */
import React, { useMemo, useState } from "react";
import { Button, CardContent, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { IContext } from "@Models/Context";

interface IProps {
  questionContext: Pick<IContext, "id" | "type" | "content">;
}

const QuestionContext: React.FC<IProps> = ({ questionContext }) => {
  const [expanded, setExpanded] = useState(false);
  const isLongContent = useMemo(
    () => questionContext.content.length > 400,
    [questionContext]
  );
  const summary = useMemo(
    () => `${questionContext.content.slice(0, 300)} ...`,
    [questionContext]
  );
  const handleExpandToggle = () => {
    setExpanded((prev) => !prev);
  };
  return (
    <CardContent>
      {expanded || !isLongContent ? (
        <Typography variant="body1" component="span" className="japanese">
          {questionContext.content}
        </Typography>
      ) : (
        <Typography variant="body1" component="span" className="japanese">
          {summary}
        </Typography>
      )}
      {isLongContent && (
        <Button
          startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          size="small"
          color="inherit"
          onClick={handleExpandToggle}
        >
          {expanded ? "Less" : "More"}
        </Button>
      )}
    </CardContent>
  );
};

export default QuestionContext;
