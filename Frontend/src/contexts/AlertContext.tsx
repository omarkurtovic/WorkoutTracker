import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { createContext, useContext, useState } from 'react';

interface AlertContextType {
    showAlert: (message: string) => void;
    showSuccess: (message: string) => void;
    showInfo: (message: string) => void;
    closeAlert: () => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"error" | "success" | "info">("error");
  
  function showAlert(message: string) {
    show(message, "error");
  }  

  function showSuccess(message: string) {
    show(message, "success");
  }

  function showInfo(message: string) {
    show(message, "info");
  }

  function show(message: string, severity: "error" | "success" | "info") {
    setAlertMessage(message);
    setAlertOpen(true);
    setAlertSeverity(severity);
  }

  function closeAlert() {
    setAlertOpen(false);
  }

  return (
    <AlertContext.Provider value={{ showAlert, showSuccess, showInfo, closeAlert }}>
      {children}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={closeAlert}>
            <Alert
              severity={alertSeverity}
              variant="filled"
              sx={{ width: '100%' }}
            >
          {alertMessage}
        </Alert>
      </Snackbar>

  </AlertContext.Provider>
  )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
  const context = useContext(AlertContext);
  
  if (context === null) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  
  return context;
};