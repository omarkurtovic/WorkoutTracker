import './App.css'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import React from 'react';
import { AppBar, Box, IconButton, Snackbar, Stack, Toolbar, Typography } from '@mui/material';
import Exercises from './features/exercises/Exercises';
import Workouts from './features/workouts/Workouts';

function App() {

  const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = React.useState("");

  function showErrorAlert(message: string) {
    setErrorAlertMessage(message);
    setErrorAlertOpen(true);
  }

  function closeErrorAlert() {
    setErrorAlertOpen(false);
  }

  const [showExercises, setShowExercises] = React.useState(true);
  const [showWorkouts, setShowWorkouts] = React.useState(false);

  const handleOpenExercises = () => {
    if(showExercises){
      return;
    }
    setShowWorkouts(false);
    setShowExercises(!showExercises);
  }

  const handleOpenWorkouts = () => {
    if(showWorkouts){
      return;
    }
    setShowExercises(false);
    setShowWorkouts(!showWorkouts);
  }


  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{flexGrow:1}}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My Workout Tracker
              </Typography>
              <Stack spacing={2} direction="row">
                <Button color="inherit">Dashboard</Button>
                <Button color="inherit" onClick={handleOpenExercises}>Exercises</Button>
                <Button color="inherit" onClick={handleOpenWorkouts}>Workouts</Button>
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>
        <Box>
          {showExercises && 
            <Exercises showError={showErrorAlert}/>
          }
        </Box>
        <Box>
          {showWorkouts && 
            <Workouts showError={showErrorAlert} />
          }
        </Box>
    </Container>

    <Snackbar
        open={errorAlertOpen}
        autoHideDuration={6000}
        onClose={closeErrorAlert}
        message={errorAlertMessage}
      />
    


  </>
  )
}

export default App
