import React from "react";
import { IconButton, OutlinedInput, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { TOption } from "@Models/Question";

interface IProps {
  option: TOption;
  index: number;
  handleOptionContentChange: (
    id: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOptionDelete: (id: string) => () => void;
}

const OptionForm: React.FC<IProps> = ({
  option,
  index,
  handleOptionContentChange,
  handleOptionDelete,
}) => {
  return (
    <OutlinedInput
      id={`option-${option?.id}`}
      type="text"
      fullWidth
      value={option?.content}
      onChange={handleOptionContentChange(option?.id)}
      endAdornment={
        <InputAdornment position="end">
          {index >= 2 && (
            <IconButton onClick={handleOptionDelete(option?.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </InputAdornment>
      }
    />
  );
};

export default OptionForm;
