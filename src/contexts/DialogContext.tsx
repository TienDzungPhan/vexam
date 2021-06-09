import React, { createContext, useState } from "react";

type TDialogType = "log-in" | "sign-up";

interface IDialogContext {
  dialogOpened: boolean;
  dialogType: TDialogType;
  handleDialogOpen: (content: TDialogType) => () => void;
  handleDialogClose: () => void;
}

interface IProps {
  children: JSX.Element;
}

export const DialogContext = createContext({} as IDialogContext);

const DialogProvider: React.FC<IProps> = ({ children }) => {
  const [dialogOpened, setDiaglogOpened] = useState(false);
  const [dialogType, setDiaglogContent] = useState<TDialogType>("log-in");
  const handleDialogOpen = (content: TDialogType) => () => {
    setDiaglogContent(content);
    setDiaglogOpened(true);
  };
  const handleDialogClose = () => setDiaglogOpened(false);
  return (
    <DialogContext.Provider
      value={{
        dialogOpened,
        dialogType,
        handleDialogOpen,
        handleDialogClose,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
