import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';



import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ErrorAlert from '../shared/components/ErrorAlert';
import SuccessAlert from '../shared/components/SuccessAlert';
import type { Workout } from '../../types';
import WorkoutsDialog from './WorkoutsDialog';

interface WorkoutsProps {
  showError: (message: string) => void;
}

function Workouts(workoutProps: WorkoutsProps) {

  const [workouts, setWorkouts] = React.useState<Workout[]>([]);
  const [openWorkoutDialog, setOpenWorkoutDialog] = React.useState(false);
  const [workoutId, setWorkoutId] = React.useState(0);

  function refreshWorkouts() {
    fetch("http://localhost:5103/workouts")
      .then(response => response.json())
      .then(data => {
        setWorkouts(data);
      })
  }

  React.useEffect(() => {
    refreshWorkouts();
  }, []);

  const handleAddNewWorkout = () => {
    setWorkoutId(0);
    setOpenWorkoutDialog(true);
  };


  const handleCloseDialog = () => {
    setOpenWorkoutDialog(false);
    refreshWorkouts();
  };


  // edit
  const handleEdit = (id: number) => {
    setWorkoutId(id);
    setOpenWorkoutDialog(true);
  }


  // delete
  const handleDelete = async (id: number) => {
    const url = `http://localhost:5103/workouts/${id}`;
    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        workoutProps.showError("Error deleting workout!");
        console.error('Failed to delete workout:', response.statusText);
        return;
      }

      setSuccessMessage("Workout deleted successfully!");
      refreshWorkouts();

    } catch (error) {
      console.error('Error deleting workout:', error);
      workoutProps.showError("Error deleting workout!");
    }
  };



  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid size={12}>
          <Typography variant="h3">Workouts</Typography>
        </Grid>
        <Grid size={12}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNewWorkout}>Add</Button>
        </Grid>
        {workouts.length == 0 &&
          <Grid size={12}>
            <Typography variant="body1">No workouts found. Please add some workouts.</Typography>
          </Grid>
        }
        {workouts.length != 0 && workouts.map((workout: Workout) => (
          <Grid key={workout.id} size={{ xs: 12, md: 6, lg: 4 }} >
            <Paper elevation={2} variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="h5">{workout.name}</Typography>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" startIcon={<EditIcon />}
                    onClick={() => handleEdit(workout.id)}>Edit</Button>
                  <Button variant='contained' startIcon={<DeleteIcon />} color="error"
                    onClick={() => handleDelete(workout.id)}>Delete</Button>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <WorkoutsDialog open={openWorkoutDialog} onClose={handleCloseDialog} id={workoutId} />

      <SuccessAlert message={successMessage} />
      <ErrorAlert message={errorMessage} />
    </>
  )
}

export default Workouts
