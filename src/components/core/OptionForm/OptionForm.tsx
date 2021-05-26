import React from "react";
import { IconButton, OutlinedInput, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { TOption } from "@Models/Question";

interface IProps {
  option: TOption;
  index: number;
  handleChangeOptionContent: (
    id: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteOption: (index: number) => () => void;
}

const OptionForm: React.FC<IProps> = ({
  option,
  index,
  handleChangeOptionContent,
  handleDeleteOption,
}) => {
  return (
    <OutlinedInput
      id={`option-${index}`}
      type="text"
      fullWidth
      value={option?.content}
      onChange={handleChangeOptionContent(option?.id)}
      endAdornment={
        <InputAdornment position="end">
          {index >= 2 && (
            <IconButton onClick={handleDeleteOption(index)}>
              <DeleteIcon />
            </IconButton>
          )}
        </InputAdornment>
      }
    />
  );
};

export default OptionForm;
