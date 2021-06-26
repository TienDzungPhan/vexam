import React, { useCallback, useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
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
import {
  createNewQuestion,
  deleteQuestion,
  updateQuestion,
} from "@Services/Question";
import {
  createNewContext,
  TContextData,
  updateContext,
} from "@Services/Context";
import useStyles from "./FormActions.styles";

const FormActions: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();
  const {
    questionId,
    question,
    selectedExam,
    selectedCategoryName,
    description,
    textContent,
    title,
    options,
    explanation,
    visibility,
    handleVisibilityChange,
  } = useContext(QuestionFormContext);
  const { userData } = useContext(AuthContext);
  const contextData = useMemo(() => {
    return textContent
      ? {
          type: "text",
          exam: { id: selectedExam?.id || "", name: selectedExam?.name || "" },
          category: selectedCategoryName,
          content: textContent,
        }
      : undefined;
  }, [selectedCategoryName, selectedExam, textContent]);
  const questionData = useMemo(() => {
    const data = {
      exam: { id: selectedExam?.id || "", name: selectedExam?.name || "" },
      category: selectedCategoryName,
      description,
      title,
      options,
      explanation,
      visibility,
    };
    return data;
  }, [
    description,
    explanation,
    options,
    selectedCategoryName,
    selectedExam,
    title,
    visibility,
  ]);
  const handleQuestionCreate = useCallback(async () => {
    try {
      if (contextData) {
        const newContextRef = await createNewContext(
          contextData as TContextData
        );
        const newQuestionRef = await createNewQuestion({
          ...questionData,
          context: {
            id: newContextRef.id,
            type: "text",
            content: textContent,
          },
          author: { id: userData?.id || "", name: userData?.name || "" },
        });
        history.push(`/questions/${newQuestionRef.id}`);
      } else {
        const newQuestionRef = await createNewQuestion({
          ...questionData,
          author: { id: userData?.id || "", name: userData?.name || "" },
        });
        history.push(`/questions/${newQuestionRef.id}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [contextData, history, questionData, textContent, userData]);
  const handleQuestionUpdate = useCallback(async () => {
    try {
      if (contextData && question?.context) {
        await updateContext(question.context.id || "", {
          type: contextData.type,
          content: contextData.content,
        } as Omit<TContextData, "exam" | "category">);
        await updateQuestion(questionId || "", {
          ...questionData,
          context: {
            ...question.context,
            type: "text",
            content: textContent,
          },
        });
      } else {
        await updateQuestion(questionId || "", questionData);
      }
      history.push(`/questions/${questionId}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [contextData, history, question, questionData, questionId, textContent]);
  const handleQuestionDelete = async () => {
    try {
      await deleteQuestion(questionId || "");
      history.push("/");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const handleCancel = () => {
    history.goBack();
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
        <Button onClick={handleCancel}>Cancel</Button>
        {questionId && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleQuestionDelete}
          >
            Delete
          </Button>
        )}
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
