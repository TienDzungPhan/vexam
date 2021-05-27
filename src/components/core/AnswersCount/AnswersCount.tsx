import React from "react";
import { CardContent, Typography } from "@material-ui/core";

interface IProps {
  variant?: string;
}

const AnswersCount: React.FC<IProps> = ({ variant }) => {
  return (
    <CardContent>
      <Typography variant={variant === "detailed" ? "h5" : "caption"}>
        99 Answers
      </Typography>
    </CardContent>
  );
};

export default AnswersCount;
