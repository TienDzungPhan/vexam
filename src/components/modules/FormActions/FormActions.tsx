import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  TextField,
} from "@material-ui/core";
import useStyles from "./FormActions.styles";

const FormActions: React.FC = () => {
  const styles = useStyles();
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
          // value={currency}
          // onChange={handleChange}
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </TextField>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button component={RouterLink} to="/">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default FormActions;
