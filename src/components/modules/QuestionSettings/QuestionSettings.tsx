import React, { useContext, useMemo, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReportIcon from "@material-ui/icons/Report";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IQuestion } from "@Models/Question";
import { AuthContext } from "@Contexts/AuthContext";
import { deleteQuestion } from "@Services/Question";

interface IProps {
  question: IQuestion | null;
}

const QuestionSettings: React.FC<IProps> = ({ question }) => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "user-settings-popover" : undefined;
  const isAuthor = useMemo(
    () => user?.uid === question?.author.id,
    [user, question]
  );
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleQuestionDelete = async () => {
    try {
      await deleteQuestion(question?.id || "");
      history.push("/");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <>
      <IconButton aria-label="settings" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        // className={styles.popover}
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItem>
          {isAuthor && (
            <>
              <ListItem
                button
                component={RouterLink}
                to={`/questions/${question?.id}/update`}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </ListItem>
              <ListItem button onClick={handleQuestionDelete}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </ListItem>
            </>
          )}
        </List>
      </Popover>
    </>
  );
};

export default QuestionSettings;
