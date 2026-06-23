import React, { useState } from 'react';
import { useAlert } from '../../contexts/AlertContext';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExerciseDialog from './ExerciseDialog';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';


import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Exercise } from '../../types';
import { useConfirm } from '../../contexts/ConfirmContext';

function Exercises() {

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [openExerciseDialog, setOpenExerciseDialog] = useState(false);
  const [exerciseId, setExerciseId] = useState(0);
  const { showAlert, showSuccess } = useAlert();
  const { showConfirm } = useConfirm();

  function refreshExercises() {
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


  const handleEdit = (id: number) => {
    setExerciseId(id);
    setOpenExerciseDialog(true);
  }


  const handleDelete = async (id: number) => {

    const confirmed = await showConfirm("Are you sure you want to delete this exercise?", "Confirm Delete");
    if (!confirmed) {
      return;
    }
    
    const url = `http://localhost:5103/exercises/${id}`;
    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        showAlert("Error deleting exercise!");
        console.error('Failed to delete exercise:', response.statusText);
        return;
      }

      showSuccess("Exercise deleted successfully!");
      refreshExercises();

    } catch (error) {
      console.error('Error deleting exercise:', error);
      showAlert("Error deleting exercise!");
    }
  };



  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid size={12}>
          <Typography variant="h3">Exercises</Typography>
        </Grid>
        <Grid size={12}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>Add</Button>
        </Grid>
        {exercises.length == 0 &&
          <Grid size={12}>
            <Typography variant="body1">No exercises found. Please add some exercises.</Typography>
          </Grid>
        }
        {exercises.length != 0 && exercises.map((exercise: Exercise) => (
          <Grid key={exercise.id} size={{ xs: 12, md: 6, lg: 4 }} >
            <Paper elevation={2} variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="h5">{exercise.name}</Typography>
                <Typography variant="body1">Target Muscle: {exercise.targetMuscle}</Typography>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" startIcon={<EditIcon />}
                    onClick={() => handleEdit(exercise.id)}>Edit</Button>
                  <Button variant='contained' startIcon={<DeleteIcon />} color="error"
                    onClick={() => handleDelete(exercise.id)}>Delete</Button>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <ExerciseDialog open={openExerciseDialog} onClose={handleClose} id={exerciseId} />
    </>
  )
}

export default Exercises
