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
  const summary = useMemo(
    () => `${questionContext.content.slice(0, 300)} ...`,
    [questionContext]
  );
  const handleExpandToggle = () => {
    setExpanded((prev) => !prev);
  };
  return (
    <CardContent>
      {expanded ? (
        <>
          <Typography variant="body1" component="span" className="japanese">
            {questionContext.content}
          </Typography>
          <Button
            startIcon={<ExpandLessIcon />}
            size="small"
            color="inherit"
            onClick={handleExpandToggle}
          >
            Less
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" component="span" className="japanese">
            {summary}
          </Typography>
          <Button
            startIcon={<ExpandMoreIcon />}
            size="small"
            color="inherit"
            onClick={handleExpandToggle}
          >
            More
          </Button>
        </>
      )}
    </CardContent>
  );
};

export default QuestionContext;
