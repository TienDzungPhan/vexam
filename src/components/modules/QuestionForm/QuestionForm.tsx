import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Radio,
  TextField,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import OptionForm from "@Core/OptionForm";
import { QuestionFormContext } from "@Contexts/QuestionFormContext";
import useStyles from "./QuestionForm.styles";

const QuestionForm: React.FC = () => {
  const styles = useStyles();
  const {
    title,
    options,
    explanation,
    optionDisabled,
    handleTitleChange,
    handleOptionContentChange,
    handleOptionSelect,
    handleOptionCreate,
    handleOptionDelete,
    handleExplanationChange,
  } = useContext(QuestionFormContext);
  return (
    <Card className={styles.card}>
      <CardHeader title="Question" />
      <CardContent>
        <TextField
          id="title"
          label="Title"
          placeholder="Title of your Question"
          multiline
          fullWidth
          variant="outlined"
          className={styles.input}
          value={title}
          onChange={handleTitleChange}
          required
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
                  onChange={handleOptionSelect}
                  disabled={optionDisabled(option)}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <OptionForm
                    option={option}
                    index={index}
                    handleOptionContentChange={handleOptionContentChange}
                    handleOptionDelete={handleOptionDelete}
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
          <ListItem button onClick={handleOptionCreate}>
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
          value={explanation}
          onChange={handleExplanationChange}
          required
        />
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
