import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ExerciseDialog from './ExerciseDialog';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import type { Exercise } from '../types';
import { Alert, Snackbar, type SnackbarCloseReason } from '@mui/material';
import ErrorAlert from './shared/components/ErrorAlert';
import SuccessAlert from './shared/components/SuccessAlert';

function Exercises() {

  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [openExerciseDialog, setOpenExerciseDialog] = React.useState(false);
  const [exerciseId, setExerciseId] = React.useState(0);
  
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function refreshExercises(){
    fetch("http://localhost:5103/exercises")
      .then(response => response.json())
      .then(data => {
        setExercises(data);
      })
  }

  React.useEffect(() => {
    refreshExercises();
  }, []);

  const handleClickOpen = () => {
    setExerciseId(0);
    setOpenExerciseDialog(true);
  };
  const handleClose = () => {
    setOpenExerciseDialog(false);
    refreshExercises();
  };


  // edit
  const handleEdit = (id: number) => {
    setExerciseId(id);
    setOpenExerciseDialog(true);
  }

  
  // delete
  const handleDelete = async (id: number) => {
    const url = `http://localhost:5103/exercises/${id}`;
    try {
      const response = await fetch(url, {method: 'DELETE'});
      if (!response.ok) {
        setErrorMessage("Error deleting exercise!");
        console.error('Failed to delete exercise:', response.statusText);
        return; 
      }

      setSuccessMessage("Exercise deleted successfully!");
      refreshExercises();

      } catch (error) {
        console.error('Error deleting exercise:', error);
        setErrorMessage("Error deleting exercise!");
      }
  };



  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignItems="center">
        <Grid size={12}>
          <Typography variant="h3">Exercises</Typography>
        </Grid>
        <Grid size={12}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>Add</Button>
        </Grid>
          {exercises.map((exercise: Exercise) => (
            <Grid key={exercise.id} size={{xs: 12, md: 6}}>
              <Box border={1} padding={3} borderRadius={4} marginBottom={2}>
                <Typography variant="h5">{exercise.name}</Typography>
                <Typography variant="body1">Target Muscle: {exercise.targetMuscle}</Typography>
                <Button variant="contained" startIcon={<EditIcon />} onClick={() => handleEdit(exercise.id)}>Edit</Button>
                <Button variant='contained' startIcon={<DeleteIcon />} color="error" onClick={() => handleDelete(exercise.id)}>Delete</Button>
                </Box>
            </Grid>
          ))}
      </Grid>
      <ExerciseDialog open={openExerciseDialog} onClose={handleClose} id={exerciseId} />
      
      <SuccessAlert message={successMessage} />
      <ErrorAlert message={errorMessage} />
    </Container>
  )
}

export default Exercises
