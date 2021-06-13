import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  TextFieldProps,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { IExam } from "@Models/Exam";
import { getExams } from "@Services/Exam";
import { AuthContext } from "@Contexts/AuthContext";
import { updateUserData } from "@Services/User";
import useStyles from "./SettingsForm.styles";

const SettingsForm: React.FC = () => {
  const history = useHistory();
  const styles = useStyles();
  const { userData } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [exams, setExams] = useState<Pick<IExam, "id" | "name">[]>([]);
  const [studyingExams, setStudyingExams] = useState<
    Pick<IExam, "id" | "name">[]
  >([]);
  const loadExams = useCallback(async () => {
    try {
      const data = await getExams();
      setExams(
        data.map((exam) => {
          return {
            id: exam.id,
            name: exam.name,
          };
        })
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleAboutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(e.target.value);
  };
  const handleStudyingExamsChange = (
    // eslint-disable-next-line @typescript-eslint/ban-types
    e: React.ChangeEvent<{}>,
    newValue: Pick<IExam, "id" | "name">[]
  ) => {
    setStudyingExams(newValue);
  };
  const handleUserDataUpdate = async () => {
    try {
      await updateUserData(userData?.id || "", { name, about, studyingExams });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const handleCancel = () => {
    history.goBack();
  };
  useEffect(() => {
    loadExams();
  }, [loadExams]);
  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setAbout(userData.about || "");
      setStudyingExams(userData.studyingExams || []);
    }
  }, [userData]);
  return (
    <>
      <Typography variant="h6" className={styles.legend}>
        Profile
      </Typography>
      <TextField
        id="name"
        label="Name"
        placeholder="Enter your display name"
        fullWidth
        variant="outlined"
        className={styles.input}
        value={name}
        onChange={handleNameChange}
        required
      />
      <TextField
        id="about"
        label="About"
        placeholder="Write something about you"
        multiline
        fullWidth
        variant="outlined"
        className={styles.input}
        rows={3}
        value={about}
        onChange={handleAboutChange}
      />
      <Autocomplete
        multiple
        id="studying-exams"
        options={exams}
        getOptionLabel={(option: Pick<IExam, "id" | "name">) => option.name}
        value={studyingExams}
        onChange={handleStudyingExamsChange}
        filterSelectedOptions
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            variant="outlined"
            label="Studying Exams"
            placeholder="Which exams are you studying?"
            className={styles.input}
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={handleUserDataUpdate}
      >
        Save
      </Button>
      <Button variant="outlined" color="primary" onClick={handleCancel}>
        Cancel
      </Button>
    </>
  );
};

export default SettingsForm;
