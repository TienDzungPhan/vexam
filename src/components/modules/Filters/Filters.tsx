import React, { useCallback, useEffect, useState } from "react";
import {
  Checkbox,
  Radio,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  FormLabel,
  Typography,
} from "@material-ui/core";
import { getExams } from "@Services/Exam";
import { IExam, TCategory } from "@Models/Exam";
import { TFilters } from "@Models/Question";
import useStyles from "./Filters.styles";

interface IProps {
  variant?: "drawer";
  filters: TFilters;
  handleFiltersChange: (filters: TFilters) => void;
}

interface ICategoryOption {
  category: TCategory;
  selected: boolean;
}

const Filters: React.FC<IProps> = ({
  variant,
  filters,
  handleFiltersChange,
}) => {
  const styles = useStyles();
  const [exams, setExams] = useState<IExam[] | null>([]);
  const [categoryFilters, setCategoryFilters] = useState<ICategoryOption[]>([]);
  const loadExams = useCallback(async () => {
    try {
      const data = await getExams();
      setExams(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);
  const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiltersChange({ ...filters, examId: e.target.value });
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const newCategoryFilters = categoryFilters.map(({ category, selected }) => {
      let currentSelectedState = selected;
      if (category.name === name) currentSelectedState = checked;
      return { category, selected: currentSelectedState };
    });
    const selectedCategories = newCategoryFilters.filter(
      ({ selected }) => selected
    );
    setCategoryFilters(newCategoryFilters);
    handleFiltersChange({
      ...filters,
      categories: selectedCategories.map(({ category }) => category.name),
    });
  };
  useEffect(() => {
    loadExams();
  }, [loadExams]);
  useEffect(() => {
    const selectedExam = exams?.find((exam) => exam.id === filters.examId);
    const categories = selectedExam?.categories?.map((category) => {
      const selected = filters.categories.includes(category.name);
      return {
        category,
        selected,
      };
    });
    setCategoryFilters(categories || []);
  }, [exams, filters]);
  return (
    <div className={styles.filters}>
      {variant === "drawer" && (
        <>
          <Typography variant="h5">Filters</Typography>
          <Divider variant="middle" />
        </>
      )}
      <FormControl component="fieldset" className={styles.formControl}>
        <FormLabel component="legend">Exams</FormLabel>
        <RadioGroup
          aria-label="exam"
          name="exam"
          value={filters.examId}
          onChange={handleExamChange}
        >
          {exams?.map((exam) => (
            <FormControlLabel
              key={exam.id}
              value={exam.id}
              control={<Radio color="primary" />}
              label={exam.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {categoryFilters.length > 0 && (
        <FormControl component="fieldset" className={styles.formControl}>
          <FormLabel component="legend">Categories</FormLabel>
          <FormGroup>
            {categoryFilters?.map(({ category, selected }) => (
              <FormControlLabel
                key={category.name}
                control={
                  <Checkbox
                    checked={selected}
                    onChange={handleCategoryChange}
                    name={category.name}
                  />
                }
                label={category.name}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
    </div>
  );
};

export default Filters;
