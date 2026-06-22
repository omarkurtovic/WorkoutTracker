import Snackbar from '@mui/material/Snackbar';
import React, { createContext, useContext, useState } from 'react';

interface SnackbarContextType {
    showAlert: (message: string) => void;
    closeAlert: () => void;
    showSuccess: (message: string) => void;
    closeSuccessAlert: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  function showAlert(message: string) {
    setAlertMessage(message);
    setAlertOpen(true);
  }  
  
  function closeAlert() {
    setAlertOpen(false);
  }


  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function showSuccess(message: string) {
    setSuccessMessage(message);
    setSuccessOpen(true);
  }

  function closeSuccessAlert() {
    setSuccessOpen(false);
  }


  return (
    <SnackbarContext.Provider value={{ showAlert, closeAlert, showSuccess, closeSuccessAlert }}>
      {children}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={closeAlert}
        message={alertMessage}
      />
    <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={closeSuccessAlert}
        message={successMessage}
      />

  </SnackbarContext.Provider>
  )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  
  if (context === null) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  
  return context;
};