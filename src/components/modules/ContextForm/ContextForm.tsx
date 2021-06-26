import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import HeadsetIcon from "@material-ui/icons/Headset";
import { QuestionFormContext } from "@Contexts/QuestionFormContext";
import useStyles from "./ContextForm.styles";

const ContextForm: React.FC = () => {
  const styles = useStyles();
  const { textContent, handleTextContentChange } =
    useContext(QuestionFormContext);
  return (
    <Card className={styles.card}>
      <CardHeader title="Context" />
      <CardContent>
        <Typography variant="body2" component="p" className={styles.text}>
          Context of your Question
        </Typography>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              // onChange={handleImageChange}
              hidden
            />
            <Button
              fullWidth
              className={styles.input}
              variant="contained"
              startIcon={<ImageIcon />}
              component="label"
              htmlFor="image"
            >
              Upload Image File
            </Button>
          </Grid>
          <Grid item md={6}>
            <input
              type="file"
              accept="audio/*"
              name="audio"
              id="audio"
              // onChange={handleAudioChange}
              hidden
            />
            <Button
              fullWidth
              className={styles.input}
              variant="contained"
              startIcon={<HeadsetIcon />}
              component="label"
              htmlFor="audio"
            >
              Upload Audio File
            </Button>
          </Grid>
        </Grid>
        <TextField
          id="context-content"
          label="Text Content"
          placeholder="Content of the Context"
          multiline
          rows={5}
          fullWidth
          variant="outlined"
          className={styles.input}
          value={textContent}
          onChange={handleTextContentChange}
        />
      </CardContent>
    </Card>
  );
};

export default ContextForm;
