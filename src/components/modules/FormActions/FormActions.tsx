import React, { useContext, useMemo } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { QuestionFormContext } from "@Contexts/QuestionFormContext";
import { AuthContext } from "@Contexts/AuthContext";
import { createNewQuestion, updateQuestion } from "@Services/Question";
import useStyles from "./FormActions.styles";

const FormActions: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();
  const {
    questionId,
    selectedExam,
    selectedCategoryName,
    description,
    title,
    options,
    explanation,
    visibility,
    handleVisibilityChange,
  } = useContext(QuestionFormContext);
  const { userData } = useContext(AuthContext);
  const questionData = useMemo(() => {
    return {
      exam: { id: selectedExam?.id || "", name: selectedExam?.name || "" },
      category: selectedCategoryName,
      description,
      title,
      options,
      explanation,
      visibility,
    };
  }, [
    description,
    explanation,
    options,
    selectedCategoryName,
    selectedExam,
    title,
    visibility,
  ]);
  const handleQuestionCreate = async () => {
    try {
      const newQuestionRef = await createNewQuestion({
        ...questionData,
        author: { id: userData?.id || "", name: userData?.name || "" },
      });
      history.push(`/questions/${newQuestionRef.id}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const handleQuestionUpdate = async () => {
    try {
      await updateQuestion(questionId || "", questionData);
      history.push(`/questions/${questionId}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <Card>
      <CardHeader title="Post" />
      <CardContent>
        <TextField
          id="visibility-select"
          select
          variant="outlined"
          label="Visibility"
          fullWidth
          value={visibility}
          onChange={handleVisibilityChange}
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </TextField>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button component={RouterLink} to="/">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={questionId ? handleQuestionUpdate : handleQuestionCreate}
        >
          {questionId ? "Save" : "Post"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default FormActions;
