import TwoSectionsLayout from "@Layouts/TwoSectionsLayout";
import React from "react";

const CreateQuestionPage: React.FC = () => {
  return (
    <TwoSectionsLayout
      main={<h1>Sample Main</h1>}
      right={<h1>Sample Right</h1>}
    />
  );
};

export default CreateQuestionPage;
