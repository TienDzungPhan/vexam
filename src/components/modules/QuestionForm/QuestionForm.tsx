import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Radio,
  MenuItem,
  TextField,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { TOption } from "@Models/Question";
import OptionForm from "@Core/OptionForm";
import useStyles from "./QuestionForm.styles";

const exams = [
  { id: "1", name: "JLPT N5", categories: ["N5-1", "N5-2", "N5-3"] },
  { id: "2", name: "JLPT N4", categories: ["N4-1", "N4-2", "N4-3"] },
  { id: "3", name: "JLPT N3", categories: ["N3-1", "N3-2", "N3-3"] },
  { id: "4", name: "JLPT N2", categories: ["N2-1", "N2-2", "N2-3"] },
  { id: "5", name: "JLPT N1", categories: ["N1-1", "N1-2", "N1-3"] },
];

const QuestionForm: React.FC = () => {
  const styles = useStyles();
  const [options, setOptions] = useState([
    { id: "1", content: "", isCorrect: false },
    { id: "2", content: "", isCorrect: false },
  ] as TOption[]);
  const handleChangeOptionContent =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newOptions = options.map((option) => {
        const newOption = option;
        newOption.isCorrect = false;
        if (option.id === id) newOption.content = e.target.value;
        return newOption;
      });
      setOptions(newOptions);
    };
  const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = options.map((option) => {
      const newOption = option;
      if (option.id === e.target.value) newOption.isCorrect = true;
      else newOption.isCorrect = false;
      return newOption;
    });
    setOptions(newOptions);
  };
  const handleAddOption = () => {
    setOptions([
      ...options,
      { id: (options.length + 1).toString(), content: "", isCorrect: false },
    ]);
  };
  const handleDeleteOption = (index: number) => () => {
    const targetOption = options[index];
    setOptions(options.filter((option) => option.id !== targetOption.id));
  };
  const optionDisabled = (option: TOption) => {
    const isBlank = !option.content;
    const isDuplicated =
      options.filter(
        (currentOption) => currentOption.content === option.content
      ).length > 1;
    return isBlank || isDuplicated;
  };
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <TextField
            id="exam-select"
            select
            variant="outlined"
            label="Exam"
            fullWidth
            className={styles.select}
            // value={currency}
            // onChange={handleChange}
            helperText="Please select an exam"
          >
            {exams.map((exam) => (
              <MenuItem key={exam.id} value={exam.id}>
                {exam.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item sm={6}>
          <TextField
            id="category-select"
            select
            variant="outlined"
            label="Category"
            fullWidth
            className={styles.select}
            // value={currency}
            // onChange={handleChange}
            helperText="Please select a category"
          >
            {exams.map((exam) => (
              <MenuItem key={exam.id} value={exam.id}>
                {exam.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Card className={styles.question}>
        <CardHeader title="Question" />
        <CardContent>
          <TextField
            id="description"
            label="Description"
            placeholder="Describe your Question"
            multiline
            fullWidth
            variant="outlined"
            className={styles.input}
          />
          <TextField
            id="title"
            label="Title"
            placeholder="Title of your Question"
            multiline
            fullWidth
            variant="outlined"
            className={styles.input}
          />
          <List
            subheader={
              <ListSubheader component="div" id="options">
                Options
              </ListSubheader>
            }
          >
            {options?.map((option, index) => (
              <ListItem key={option.id}>
                <ListItemIcon>
                  <Radio
                    color="primary"
                    name="options"
                    checked={option.isCorrect}
                    value={option.id}
                    onChange={handleSelectOption}
                    disabled={optionDisabled(option)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <OptionForm
                      option={option}
                      index={index}
                      handleChangeOptionContent={handleChangeOptionContent}
                      handleDeleteOption={handleDeleteOption}
                    />
                  }
                  secondary={
                    optionDisabled(option) && (
                      <span className={styles.error}>
                        Blank or duplicated option!
                      </span>
                    )
                  }
                />
              </ListItem>
            ))}
            <ListItem button onClick={handleAddOption}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add more Option" />
            </ListItem>
          </List>
          <TextField
            id="explanation"
            label="Explanation"
            placeholder="Explain the Answer"
            multiline
            fullWidth
            variant="outlined"
            className={styles.input}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionForm;
