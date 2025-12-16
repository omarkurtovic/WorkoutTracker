import './App.css'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import React from 'react';
import Exercises from './features/Exercises';
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';

function App() {

  const [showExercises, setShowExercises] = React.useState(false);
  const handleOpenExercises = () => {
    setShowExercises(!showExercises);
  }


  return (
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
              <Button color="inherit" onClick={handleOpenExercises}>Workouts</Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        {showExercises && 
          <Exercises />
        }
      </Box>
  </Container>
  )
}

export default App
