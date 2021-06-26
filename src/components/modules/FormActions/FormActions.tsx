import React, { useCallback, useContext, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
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
  const [createMoreQuestionAccepted, setCreateMoreQuestionAccepted] =
    useState(false);
  const {
    isCreating,
    questionId,
    question,
    selectedExam,
    selectedCategoryName,
    description,
    textContent,
    contextId,
    title,
    options,
    explanation,
    visibility,
    handleIsCreatingStateChange,
    handleContextIdChange,
    handleVisibilityChange,
    clearQuestionContent,
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
  const handleCreateMoreQuestionCheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreateMoreQuestionAccepted(e.target.checked);
  };
  const handleQuestionCreate = useCallback(async () => {
    try {
      if (contextData) {
        if (!contextId) {
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
          if (createMoreQuestionAccepted) {
            handleIsCreatingStateChange();
            clearQuestionContent();
            handleContextIdChange(newContextRef.id);
          } else {
            history.push(`/questions/${newQuestionRef.id}`);
          }
        } else {
          const newQuestionRef = await createNewQuestion({
            ...questionData,
            context: {
              id: contextId,
              type: "text",
              content: textContent,
            },
            author: { id: userData?.id || "", name: userData?.name || "" },
          });
          if (createMoreQuestionAccepted) {
            handleIsCreatingStateChange();
            clearQuestionContent();
            handleContextIdChange(contextId);
          } else {
            history.push(`/questions/${newQuestionRef.id}`);
          }
        }
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
  }, [
    clearQuestionContent,
    contextData,
    contextId,
    createMoreQuestionAccepted,
    handleContextIdChange,
    handleIsCreatingStateChange,
    history,
    questionData,
    textContent,
    userData,
  ]);
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
      if (createMoreQuestionAccepted) {
        handleIsCreatingStateChange();
        clearQuestionContent();
        handleContextIdChange(contextId);
      } else {
        history.push(`/questions/${questionId}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [
    clearQuestionContent,
    contextData,
    contextId,
    createMoreQuestionAccepted,
    handleContextIdChange,
    handleIsCreatingStateChange,
    history,
    question,
    questionData,
    questionId,
    textContent,
  ]);
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
        <FormControlLabel
          className={styles.checkbox}
          control={
            <Checkbox
              checked={createMoreQuestionAccepted}
              onChange={handleCreateMoreQuestionCheck}
              disabled={!contextData}
              name="createMoreQuestion"
              color="primary"
            />
          }
          label="Also create another question with the same context"
        />
      </CardContent>
      <CardActions className={styles.actions}>
        <Button onClick={handleCancel}>Cancel</Button>
        {!isCreating && (
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
          onClick={isCreating ? handleQuestionCreate : handleQuestionUpdate}
        >
          {isCreating ? "Create" : "Save"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default FormActions;
