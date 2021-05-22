import React, { useMemo } from "react";
import { TOption } from "@Models/Question";
import { FormControlLabel, Radio, Typography } from "@material-ui/core";
import useStyles from "./Option.styles";

interface IOptionProps {
  option: TOption;
  selectedContent: string;
  answered: boolean;
}

const Option: React.FC<IOptionProps> = ({
  option,
  selectedContent,
  answered,
}) => {
  const styles = useStyles();
  const optionStyles = useMemo(() => {
    if (answered) {
      if (option?.isCorrect) return styles.correct;
      if (option.content === selectedContent) return styles.incorrect;
    }
    return "";
  }, [styles, option, selectedContent, answered]);
  return (
    <div className={styles.option}>
      <FormControlLabel
        key={option.id}
        value={option.content}
        control={<Radio color="primary" />}
        label={<span className="japanese">{option.content}</span>}
        disabled={answered}
        className={optionStyles}
      />
      {answered && (
        <Typography variant="caption" className={optionStyles}>
          69%
        </Typography>
      )}
    </div>
  );
};

export default Option;
