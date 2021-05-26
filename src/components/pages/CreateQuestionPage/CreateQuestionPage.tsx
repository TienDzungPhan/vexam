import React from "react";
import TwoSectionsLayout from "@Layouts/TwoSectionsLayout";
import FormActions from "@Modules/FormActions";
import QuestionForm from "@Modules/QuestionForm";

const CreateQuestionPage: React.FC = () => {
  return (
    <TwoSectionsLayout
      title="Create Question"
      main={<QuestionForm />}
      right={
        <>
          <FormActions />
        </>
      }
    />
  );
};

export default CreateQuestionPage;
