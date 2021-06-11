import React from "react";
import TwoSectionsLayout from "@Layouts/TwoSectionsLayout";
import FormActions from "@Modules/FormActions";
import QuestionForm from "@Modules/QuestionForm";
import TagsForm from "@Modules/TagsForm";
import QuestionFormProvider from "@Contexts/QuestionFormContext";

const CreateQuestionPage: React.FC = () => {
  return (
    <QuestionFormProvider>
      <TwoSectionsLayout
        title="Create Question"
        main={<QuestionForm />}
        right={
          <>
            <FormActions />
            <TagsForm />
          </>
        }
      />
    </QuestionFormProvider>
  );
};

export default CreateQuestionPage;
