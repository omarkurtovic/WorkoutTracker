import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Exercise } from '../../types';
import { Autocomplete, Box, Grid, Typography } from '@mui/material';
import SuccessAlert from '../shared/components/SuccessAlert';
import ErrorAlert from '../shared/components/ErrorAlert';


interface WorkoutDialogProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

export default function WorkoutDialog({ open, onClose, id=0 }: WorkoutDialogProps) {

  const [name, setName] = React.useState("");
  const [allExercises, setAllExercises] = React.useState<Exercise[]>([]);
  const [exercisesInUse, setExercisesInUse] = React.useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = React.useState<Exercise | null>(null);


  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const exercise: Exercise = {
    //   id: id,
    //   name: name,
    //   targetMuscle: targetMuscle,
    //   description: description || undefined,
    // };

    // try {
    //   let url = "";
    //   let method = "";
    //   if(id === 0){
    //     url = `http://localhost:5103/exercises`;
    //     method = "POST";
    //   }
    //   else{
    //     url = `http://localhost:5103/exercises/${id}`;
    //     method = "PUT";
    //   }
      
    //   const response = await fetch(url, {
    //     method: method,
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(exercise),
    //   });
    //   if (!response.ok) {
    //     setErrorMessage("Error saving exercise!");
    //     console.error('Failed to save exercise:', response.statusText);
    //   }
    //   else{
    //     setSuccessMessage("Exercise saved successfully!");
    //   }
    // }
    // catch (error) {
    //   console.error('Error saving exercise:', error);
    //   setErrorMessage("Error saving exercise!");
    // }

    // onClose();
  };

    React.useEffect(() => {

      const fetchWorkout = async() => {
        if (id === 0){
          setName("");
          setExercisesInUse([]);
          return;
        }
        const url = `http://localhost:5103/workouts/${id}`;
          try {
            const response = await fetch(url, {method: 'GET'});
            if (!response.ok) {
              setErrorMessage("Error getting workout!");
              console.error('Failed to get workout:', response.statusText);
              onClose();
              return; 
            }
            
            let data = await response.json();
            setName(data.name);
            setExercisesInUse(data.exercises || []);

            } catch (error) {
              console.error('Error getting workout:', error);
              setErrorMessage("Error getting workout!");
              onClose();
            }
          }


      const fetchExercises = async() => {
        const url = `http://localhost:5103/exercises`;
          try {
            const response = await fetch(url, {method: 'GET'});
            if (!response.ok) {
              setErrorMessage("Error getting exercises!");
              console.error('Failed to get exercises:', response.statusText);
              onClose();
              return; 
            }
            
            let data = await response.json();
            setAllExercises(data || []);

            } catch (error) {
              console.error('Error getting exercises:', error);
              setErrorMessage("Error getting exercises!");
              onClose();
            }
          }

        fetchWorkout();
        fetchExercises();
      }, [open, id]);
    
      function getExerciseOptions(){
        let options = [];
        for(let exercise of allExercises){
          if(!exercisesInUse.find(ex => ex.id === exercise.id)){
            options.push({ label: exercise.name, id: exercise.id });
          }
        }
        return options;
      }

      function handleRemoveExercise(exerciseId: number) {
        setExercisesInUse(prevExercises => prevExercises.filter(ex => ex.id !== exerciseId));
      }

      function handleAddExercise(){
        if(!selectedExercise){
            return;
        }
        if(exercisesInUse.find(ex => ex.id === selectedExercise.id)){
            return;
        }

        exercisesInUse.push(selectedExercise);
        setExercisesInUse(exercisesInUse);
      }

  return (
    <>
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{id === 0 ? "Add Workout" : "Edit Workout"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField autoFocus required margin="dense"
              id="name" name="name" label="Name" type="text"
              fullWidth variant="standard" value={name} onChange={(e) => setName(e.target.value)}/>
              {exercisesInUse.map(exercise => (
                <Box key={exercise.id} sx={{ mt: 2, mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                    <Typography variant="h6">{exercise.name}</Typography>
                    <Button onClick={() => handleRemoveExercise(exercise.id)}>Remove</Button>
                </Box>
            ))}

            <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 2, alignItems: "center", mt: 2, mb: 2 }}>
                <Autocomplete
                    disablePortal onChange={(event, value) => {
                        setSelectedExercise(allExercises.find(exercise => exercise.id == value?.id) || null);
                    }}
                    options={getExerciseOptions()}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Exercise" />}
                    />
                <Button variant='contained' onClick={() => handleAddExercise()}>Add</Button>
            </Box>
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <SuccessAlert message={successMessage} />
      <ErrorAlert message={errorMessage} />
      </>
  )
}
