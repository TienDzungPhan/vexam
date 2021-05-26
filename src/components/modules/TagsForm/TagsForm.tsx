import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./TagsForm.styles";

const tags = [
  { id: "1", label: "JLPT N5" },
  { id: "2", label: "Kanji" },
];

const currentTagOptions = tags.reduce((options, tag) => {
  return { ...options, [tag.label]: false };
}, {} as { [x: string]: boolean });

const TagsForm: React.FC = () => {
  const styles = useStyles();
  const [tagOptions, setTagOptions] = useState(currentTagOptions);
  const [newTagLabel, setNewTagLabel] = useState("");
  const handleTagSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagOptions({
      ...tagOptions,
      [e.target.name]: e.target.checked,
    });
  };
  const handleAddNewTag = () => {
    setTagOptions({
      ...tagOptions,
      [newTagLabel]: true,
    });
    setNewTagLabel("");
  };
  const handleNewTagLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagLabel(e.target.value);
  };
  return (
    <Card className={styles.tagsForm}>
      <CardHeader title="Tags" />
      <CardContent>
        <FormGroup>
          {Object.keys(tagOptions)?.map((label) => (
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={tagOptions[label]}
                  onChange={handleTagSelect}
                  name={label}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
        <FormControl variant="outlined" className={styles.newTag}>
          <InputLabel htmlFor="new-tag">New Tag</InputLabel>
          <OutlinedInput
            id="new-tag"
            type="text"
            value={newTagLabel}
            onChange={handleNewTagLabelChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleAddNewTag}
                  edge="end"
                  disabled={!newTagLabel}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default TagsForm;
