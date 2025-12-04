import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import ExerciseDialog from './ExerciseDialog';
import type { Exercise } from '../types';

function Exercises() {

  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [openExerciseDialog, setOpenExerciseDialog] = React.useState(false);

  React.useEffect(() => {
    fetch("http://localhost:5103/exercises")
      .then(response => response.json())
      .then(data => {
        setExercises(data);
      })
  }, []);

  const handleClickOpen = () => {
    setOpenExerciseDialog(true);
  };
  const handleClose = () => {
    setOpenExerciseDialog(false);
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Exercises
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>Add</Button>
      {exercises.map((exercise: Exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.name}</h2>
          <p>Target Muscle: {exercise.targetMuscle}</p>
          {exercise.description && <p>Description: {exercise.description}</p>}
        </div>
      ))}
      <ExerciseDialog open={openExerciseDialog} onClose={handleClose} />
    </>
  )
}

export default Exercises
