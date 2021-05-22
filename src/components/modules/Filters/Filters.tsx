import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import useStyles from "./Filters.styles";

const exams = [
  { id: "1", name: "JLPT N5", categories: ["N5-1", "N5-2", "N5-3"] },
  { id: "2", name: "JLPT N4", categories: ["N4-1", "N4-2", "N4-3"] },
  { id: "3", name: "JLPT N3", categories: ["N3-1", "N3-2", "N3-3"] },
  { id: "4", name: "JLPT N2", categories: ["N2-1", "N2-2", "N2-3"] },
  { id: "5", name: "JLPT N1", categories: ["N1-1", "N1-2", "N1-3"] },
];

const examFilters = exams.reduce((filters, exam) => {
  return { ...filters, [exam.id]: false };
}, {} as { [x: string]: boolean });

const Filters: React.FC = () => {
  const styles = useStyles();
  const [currentExamFilters, setCurrentExamFilters] = useState(examFilters);
  const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExamFilters({
      ...currentExamFilters,
      [e.target.name]: e.target.checked,
    });
  };
  return (
    <div className={styles.filters}>
      <FormControl component="fieldset" className={styles.formControl}>
        <FormLabel component="legend">Exams</FormLabel>
        <FormGroup>
          {exams?.map((exam) => (
            <FormControlLabel
              key={exam.id}
              control={
                <Checkbox
                  color="primary"
                  checked={currentExamFilters[exam.id]}
                  onChange={handleExamChange}
                  name={exam.id}
                />
              }
              label={exam.name}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={styles.formControl}>
        <FormLabel component="legend">Categories</FormLabel>
        <FormGroup>
          {exams?.map((exam) => (
            <FormControlLabel
              key={exam.id}
              control={
                <Checkbox
                  checked={currentExamFilters[exam.id]}
                  onChange={handleExamChange}
                  name={exam.id}
                />
              }
              label={exam.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default Filters;
