import * as React from 'react';
import { Alert, Snackbar, type SnackbarCloseReason } from '@mui/material';

interface ErrorAlertProps{
    message: string
}

function ErrorAlert(props: ErrorAlertProps) {

  // error snackbar
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSnackbarErrorClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorSnackbar(false);
  };  
  
  const handleClose = () => {
    setOpenErrorSnackbar(false);
  };

  React.useEffect(() => {
    if(props.message){
        setMessage(props.message);
        setOpenErrorSnackbar(true);
    }
  }, [props.message])


  return (
      <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleSnackbarErrorClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
  )
}

export default ErrorAlert
