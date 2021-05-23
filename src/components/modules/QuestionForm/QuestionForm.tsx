import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  TextField,
  ListSubheader,
  ButtonGroup,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { TOption } from "@Models/Question";
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
  const handleAddOption = () => {
    setOptions([
      ...options,
      { id: options.length.toString(), content: "", isCorrect: false },
    ]);
  };
  const handleDeleteOption = (index: number) => {
    const targetOption = options[index];
    setOptions(options.filter((option) => option.id !== targetOption.id));
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
                  <ArrowForwardIosIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <OutlinedInput
                      id="option"
                      type="text"
                      fullWidth
                      // value={values.password}
                      // onChange={handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          {index < 2 ? (
                            <Button startIcon={<CheckIcon />}>Select</Button>
                          ) : (
                            <ButtonGroup variant="text">
                              <Button startIcon={<CheckIcon />}>Select</Button>
                              <Button
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDeleteOption(index)}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          )}
                        </InputAdornment>
                      }
                    />
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
