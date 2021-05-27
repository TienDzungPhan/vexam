import React from "react";
import { IQuestion } from "@Models/Question";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

interface IProps {
  question: IQuestion;
}

const Comments: React.FC<IProps> = () => {
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
      <CardContent />
    </Card>
  );
};

export default Comments;
