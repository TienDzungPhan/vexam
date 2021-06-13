import React from "react";
import OneSectionLayout from "@Layouts/OneSectionLayout";
import SettingsForm from "@Modules/SettingsForm";

const SettingsPage: React.FC = () => {
  return <OneSectionLayout title="Settings" main={<SettingsForm />} />;
};

export default SettingsPage;
