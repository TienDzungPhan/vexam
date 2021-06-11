import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
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
import OptionForm from "@Core/OptionForm";
import { IExam, TCategory } from "@Models/Exam";
import { getExams } from "@Services/Exam";
import { QuestionFormContext } from "@Contexts/QuestionFormContext";
import useStyles from "./QuestionForm.styles";

const QuestionForm: React.FC = () => {
  const styles = useStyles();
  const [exams, setExams] = useState<IExam[]>([]);
  const {
    selectedExam,
    selectedCategory,
    description,
    title,
    options,
    explanation,
    optionDisabled,
    selectExam,
    selectCategory,
    handleDescriptionChange,
    handleTitleChange,
    handleOptionContentChange,
    handleOptionSelect,
    handleOptionCreate,
    handleOptionDelete,
    handleExplanationChange,
  } = useContext(QuestionFormContext);
  const loadExams = useCallback(async () => {
    try {
      const examsData = await getExams();
      setExams(examsData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);
  const categories = useMemo(
    () => selectedExam?.categories || ([] as TCategory[]),
    [selectedExam]
  );
  const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetExam =
      exams?.find((exam) => exam.id === e.target.value) || null;
    selectExam(targetExam);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetCategory =
      categories?.find((category) => category.name === e.target.value) || null;
    selectCategory(targetCategory);
  };
  useEffect(() => {
    loadExams();
  }, [loadExams]);
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
            value={selectedExam?.id || ""}
            onChange={handleExamChange}
            required
          >
            <MenuItem disabled>--Select an Exam-</MenuItem>
            {exams?.map((exam) => (
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
            value={selectedCategory?.name || ""}
            onChange={handleCategoryChange}
            required
          >
            <MenuItem disabled>--Select a Category--</MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category.name} value={category.name}>
                {category.name}
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
            value={description}
            onChange={handleDescriptionChange}
            required
          />
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
    </div>
  );
};

export default QuestionForm;
