import React, { createContext, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

interface ConfirmContextType {
    showConfirm: (message: string, title: string) => Promise<boolean>;
    closeConfirm: () => void;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

    function handleClose(){
        setOpen(false);
    }

    function handleShow(message: string, title: string): Promise<boolean> {
        setMessage(message);
        setTitle(title);
        setOpen(true);
        return new Promise((resolve) => {
            setResolver(() => resolve);
        });
    }

    function handleConfirm() {
        setOpen(false);
        if (resolver) {
            resolver(true);
        }
    }

    function handleCancel(){
        setOpen(false);
        if (resolver) {
            resolver(false);
        }
    }

  return (
    <ConfirmContext.Provider value={{ showConfirm: handleShow, closeConfirm: handleClose }}>

      {children}
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog">
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                {message}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancel} autoFocus>
                Cancel
            </Button>
            <Button onClick={handleConfirm} autoFocus>
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
    </ConfirmContext.Provider>
  )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  
  if (context === null) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  
  return context;
};