import React from "react";
import { useParams } from "react-router-dom";
import TwoSectionsLayout from "@Layouts/TwoSectionsLayout";
import FormActions from "@Modules/FormActions";
import QuestionForm from "@Modules/QuestionForm";
import TagsForm from "@Modules/TagsForm";
import QuestionFormProvider from "@Contexts/QuestionFormContext";

const QuestionModifyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <QuestionFormProvider questionId={id}>
      <TwoSectionsLayout
        title={id ? "Edit Question " : "Create Question"}
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

export default QuestionModifyPage;
