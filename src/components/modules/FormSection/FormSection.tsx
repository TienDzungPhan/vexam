import React, { useMemo, useContext } from "react";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import { TCategory } from "@Models/Exam";
import { QuestionFormContext } from "@Contexts/QuestionFormContext";
import QuestionForm from "@Modules/QuestionForm";
import ContextForm from "@Modules/ContextForm";
import useStyles from "./FormSection.styles";

const FormSection: React.FC = () => {
  const styles = useStyles();
  const {
    exams,
    selectedExam,
    selectedCategoryName,
    description,
    selectExam,
    selectCategory,
    handleDescriptionChange,
  } = useContext(QuestionFormContext);
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
    selectCategory(e.target.value);
  };
  return (
    <>
      <Grid container spacing={3} justify="center">
        <Grid item md={6}>
          <TextField
            id="exam-select"
            select
            variant="outlined"
            label="Exam"
            fullWidth
            className={styles.outsideInput}
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
        <Grid item md={6}>
          <TextField
            id="category-select"
            select
            variant="outlined"
            label="Category"
            fullWidth
            className={styles.outsideInput}
            value={selectedCategoryName}
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
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="description"
            label="Description"
            placeholder="Describe your Question"
            multiline
            fullWidth
            variant="outlined"
            className={styles.outsideInput}
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </Grid>
      </Grid>
      <ContextForm />
      <QuestionForm />
    </>
  );
};

export default FormSection;
