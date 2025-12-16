import './App.css'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import React from 'react';
import Exercises from './features/Exercises';
import { Stack, Typography } from '@mui/material';

function App() {

  const [showExercises, setShowExercises] = React.useState(false);
  const handleOpenExercises = () => {
    setShowExercises(!showExercises);
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h3">My Workout App</Typography>
        <Button variant="contained"  onClick={handleOpenExercises}>Exercises</Button>
          {showExercises && 
            <Exercises />
          }
      </Stack>
    </Container>
  )
}

export default App
