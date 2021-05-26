import TwoSectionsLayout from "@Layouts/TwoSectionsLayout";
import QuestionForm from "@Modules/QuestionForm";
import React from "react";

const CreateQuestionPage: React.FC = () => {
  return (
    <TwoSectionsLayout
      title="Create Question"
      main={<QuestionForm />}
      right={<h1>Sample Right</h1>}
    />
  );
};

export default CreateQuestionPage;
