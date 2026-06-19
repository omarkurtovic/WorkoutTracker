import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog(confirmDialogProps: AlertDialogProps) {

  return (
      <Dialog
        open={true}
        onClose={confirmDialogProps.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {confirmDialogProps.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmDialogProps.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDialogProps.onClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={confirmDialogProps.onConfirm} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  );
}
