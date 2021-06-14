import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import ThreeSectionsLayout from "@Layouts/ThreeSectionsLayout";
import { IQuestion } from "@Models/Question";
import Biography from "@Modules/Biography";
import Filters from "@Modules/Filters";
import Question from "@Modules/Question";
import Performance from "@Modules/Performance";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import FiltersDrawer from "@Modules/FiltersDrawer";
import questionsDB, { getQuestions } from "@Services/Question";
import UserHeadline from "@Modules/UserHeadline";
import { AuthContext } from "@Contexts/AuthContext";
import { IUser } from "@Models/User";
import { getUserById } from "@Services/User";

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { id: userId } = useParams<{ id: string }>();
  const { userData: currentUserData } = useContext(AuthContext);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [questions, setQuestions] = useState([] as IQuestion[]);
  const isCurrentUser = useMemo(
    () => userId === currentUserData?.id,
    [currentUserData, userId]
  );
  const loadUserData = useCallback(async () => {
    try {
      const data = await getUserById(userId);
      setUserData(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [userId]);
  const loadQuestions = useCallback(async () => {
    try {
      const questionsData = await getQuestions(
        questionsDB.where("author.id", "==", userId)
      );
      setQuestions(questionsData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [userId]);
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);
  useEffect(() => {
    if (isCurrentUser) {
      setUserData(currentUserData);
    } else {
      loadUserData();
    }
  }, [currentUserData, isCurrentUser, loadUserData]);
  return (
    <>
      {!isDesktop && <FiltersDrawer />}
      <ThreeSectionsLayout
        headline={
          <UserHeadline isCurrentUser={isCurrentUser} userData={userData} />
        }
        left={<Filters />}
        main={
          <>
            {questions?.map((question) => (
              <Question key={question?.id} question={question} />
            ))}
          </>
        }
        right={
          <>
            {(userData?.about || userData?.studyingExams) && (
              <Biography userData={userData} />
            )}
            <Performance />
          </>
        }
      />
    </>
  );
};

export default ProfilePage;
