import * as React from 'react';
import { Alert, Snackbar, type SnackbarCloseReason } from '@mui/material';

interface SuccessAlertProps{
    message: string
}

function SuccessAlert(props: SuccessAlertProps) {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSnackbarSuccessClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessSnackbar(false);
  };  
  
  const handleClose = () => {
    setOpenSuccessSnackbar(false);
  };

  React.useEffect(() => {
    if(props.message){
        setMessage(props.message);
        setOpenSuccessSnackbar(true);
    }
  }, [props.message])


  return (
      <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleSnackbarSuccessClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
  )
}

export default SuccessAlert
