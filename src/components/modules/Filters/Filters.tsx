import React, { useCallback, useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import examsDB from "@Services/Exam";
import {
  IExam,
  // TCategory
} from "@Models/Exam";
import useStyles from "./Filters.styles";

interface IExamFilter extends IExam {
  selected: boolean;
}

// interface ICategoryFilter extends TCategory {
//   selected: boolean;
// }

const Filters: React.FC = () => {
  const styles = useStyles();
  const [examFilters, setExamFilters] = useState<IExamFilter[]>();
  // const [categoryFilters, setCategoryFilters] = useState(
  //   [] as ICategoryFilter[]
  // );
  const loadExams = useCallback(async () => {
    try {
      const examsSnapshot = await examsDB.get();
      const examsData: IExamFilter[] = [];
      examsSnapshot.forEach((doc) =>
        examsData.push({
          id: doc.id,
          selected: false,
          ...doc.data(),
        } as IExamFilter)
      );
      setExamFilters(examsData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);
  const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: examId, checked } = e.target;
    const newExamFilters = examFilters?.map((exam) => {
      const newExam = exam;
      if (exam.id === examId) newExam.selected = checked;
      return newExam;
    });
    setExamFilters(newExamFilters);
  };
  // const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;
  //   const newCategoryFilters = categoryFilters.map((category) => {
  //     const newCategory = category;
  //     if (category.name === name) newCategory.selected = checked;
  //     return newCategory;
  //   });
  //   setCategoryFilters(newCategoryFilters);
  // };
  useEffect(() => {
    loadExams();
  }, [loadExams]);
  // useEffect(() => {
  //   examFilters.forEach((exam) => {
  //     if (exam.selected) {
  //       const categories: ICategoryFilter[] = exam.categories.map(
  //         (category) => {
  //           return {
  //             ...category,
  //             selected: false,
  //           };
  //         }
  //       );
  //       setCategoryFilters(categories);
  //     }
  //   });
  // }, [examFilters]);
  return (
    <div className={styles.filters}>
      <FormControl component="fieldset" className={styles.formControl}>
        <FormLabel component="legend">Exams</FormLabel>
        <FormGroup>
          {examFilters?.map((exam) => (
            <FormControlLabel
              key={exam.id}
              control={
                <Checkbox
                  color="primary"
                  checked={exam.selected}
                  onChange={handleExamChange}
                  name={exam.id}
                />
              }
              label={exam.name}
            />
          ))}
        </FormGroup>
      </FormControl>
      {/* {categoryFilters.length > 0 && (
        <FormControl component="fieldset" className={styles.formControl}>
          <FormLabel component="legend">Categories</FormLabel>
          <FormGroup>
            {categoryFilters?.map((category) => (
              <FormControlLabel
                key={category.name}
                control={
                  <Checkbox
                    checked={category.selected}
                    onChange={handleCategoryChange}
                    name={category.name}
                  />
                }
                label={category.name}
              />
            ))}
          </FormGroup>
        </FormControl>
      )} */}
    </div>
  );
};

export default Filters;
