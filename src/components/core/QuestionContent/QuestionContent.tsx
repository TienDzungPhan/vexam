import React from "react";
import { IQuestion } from "@Models/Question";
import Option from "@Core/Option";
import { Card, CardContent, RadioGroup, Typography } from "@material-ui/core";
import useStyles from "./QuestionContent.styles";

interface IProps {
  variant?: string;
  question: IQuestion;
  answered: boolean;
  selectedContent: string;
  handleOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Content: React.FC<IProps> = ({
  question,
  answered,
  selectedContent,
  handleOptionChange,
}) => {
  const styles = useStyles();
  return (
    <CardContent className={styles.questionContent}>
      <Typography variant="h6" className="japanese">
        {question?.title}
      </Typography>
      <RadioGroup
        aria-label="options"
        name="answer"
        className={styles.options}
        value={selectedContent}
        onChange={handleOptionChange}
      >
        {question?.options.map((option) => (
          <Option
            key={option.id}
            option={option}
            selectedContent={selectedContent}
            answered={answered}
          />
        ))}
      </RadioGroup>
      {answered && (
        <Typography variant="subtitle2" className={styles.explanation}>
          {question?.explanation}
        </Typography>
      )}
      <Typography variant="caption">
        99 people attempted this question
      </Typography>
    </CardContent>
  );
};

const QuestionContent: React.FC<IProps> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  return props.variant === "detailed" ? (
    <Card>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Content {...props} />
    </Card>
  ) : (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <Content {...props} />
  );
};

export default QuestionContent;
