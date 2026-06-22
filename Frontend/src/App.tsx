import './App.css'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import React from 'react';
import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import Exercises from './features/exercises/Exercises';
import Workouts from './features/workouts/Workouts';
import { SnackbarProvider } from './contexts/SnackbarContext';

function App() {

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
    <SnackbarProvider>

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
            <Exercises />
          }
        </Box>
        <Box>
          {showWorkouts && 
            <Workouts />
          }
        </Box>
    </Container>
    </SnackbarProvider>

  </>
  )
}

export default App
