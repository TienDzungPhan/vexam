import React, { useCallback, useState, useEffect, useMemo } from "react";
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
import { IExam, TCategory } from "@Models/Exam";
import examsDB from "@Services/Exam";
import useStyles from "./QuestionForm.styles";

const QuestionForm: React.FC = () => {
  const styles = useStyles();
  const [exams, setExams] = useState<IExam[]>();
  const [selectedExam, setSelectedExam] = useState<IExam>();
  const [selectedCategory, setSelectedCategory] = useState<TCategory>();
  const [options, setOptions] = useState([
    { id: "1", content: "", isCorrect: false },
    { id: "2", content: "", isCorrect: false },
  ] as TOption[]);
  const loadExams = useCallback(async () => {
    try {
      const examsSnapshot = await examsDB.get();
      const examsData: IExam[] = [];
      examsSnapshot.forEach((doc) =>
        examsData.push({
          id: doc.id,
          ...doc.data(),
        } as IExam)
      );
      setExams(examsData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);
  const categories = useMemo(() => selectedExam?.categories, [selectedExam]);
  const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetExam = exams?.find((exam) => exam.id === e.target.value);
    setSelectedExam(targetExam);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetCategory = categories?.find(
      (category) => category.name === e.target.value
    );
    setSelectedCategory(targetCategory);
  };
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
            value={selectedExam?.id}
            onChange={handleExamChange}
            required
          >
            <MenuItem value={undefined} disabled>
              --Select an Exam-
            </MenuItem>
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
            value={selectedCategory?.name}
            onChange={handleCategoryChange}
            required
          >
            <MenuItem value={undefined} disabled>
              --Select a Category--
            </MenuItem>
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
            required
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionForm;
