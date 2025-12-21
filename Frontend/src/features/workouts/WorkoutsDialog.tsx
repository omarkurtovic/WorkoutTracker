import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Exercise, Workout } from '../../types';
import { Box, Stack, Typography } from '@mui/material';
import ExercisePickerDialog from './ExercisePickerDialog';


interface WorkoutDialogProps {
    open: boolean;
    onClose: () => void;
    id: number;
}

export default function WorkoutDialog({ open, onClose, id = 0 }: WorkoutDialogProps) {

    const [workout, setWorkout] = React.useState<Workout>({ id: 0, name: "", exercises: [] });
    const [openExercisePickerDialog, setOpenExercisePickerDialog] = React.useState(false);

    React.useEffect(() => {

        const fetchWorkout = async () => {
            if (id === 0) {
                setWorkout({ id: 0, name: "", exercises: [] });
                return;
            }
            const url = `http://localhost:5103/workouts/${id}`;
            try {
                const response = await fetch(url, { method: 'GET' });
                if (!response.ok) {
                    alert("Error getting workout!");
                    console.error('Failed to get workout:', response.statusText);
                    onClose();
                    return;
                }

                let data = await response.json();
                setWorkout(data);

            } catch (error) {
                console.error('Error getting workout:', error);
                alert("Error getting workout!");
                onClose();
            }
        }

        fetchWorkout();
    }, [open, id]);


    function handleRemoveExercise(exerciseId: number) {
        setWorkout(prevWorkout => ({
            ...prevWorkout,
            exercises: prevWorkout.exercises.filter(ex => ex.id !== exerciseId)
        }));
    }

    
    const handleAddExerciseClick = () => {
        setOpenExercisePickerDialog(true);
    };

    function handleCloseExercisePickerDialog() {
        setOpenExercisePickerDialog(false);
    }

    function onExerciseSelected(exercise: Exercise) {
        if(workout.exercises.find(ex => ex.id === exercise.id)){
            return;
        }
        setWorkout(prevWorkout => ({
            ...prevWorkout,
            exercises: [...prevWorkout.exercises, exercise]
        }));
    }

    async function onSave(){
        if(workout.name.trim() === ""){
            alert("Please enter a name for the workout.");
            return;
        }

        if(workout.exercises.length === 0){
            alert("Please add at least one exercise to the workout.");
            return;
        }
        
        try {
          let url = "";
          let method = "";
          if(workout.id === 0){
            url = `http://localhost:5103/workouts`;
            method = "POST";
          }
          else{
            url = `http://localhost:5103/workouts/${workout.id}`;
            method = "PUT";
          }

          const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workout),
          });
          if (!response.ok) {
            alert("Error saving workout!");
            console.error('Failed to save workout:', response.statusText);
          }
          else{
            alert("Workout saved successfully!");
          }
        }
        catch (error) {
          console.error('Error saving workout:', error);
          alert("Error saving workout!");
        }

        onClose();
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>{id === 0 ? "Add Workout" : "Edit Workout"}</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} marginTop={2}>
                        <TextField autoFocus required margin="dense"
                            id="name" name="name" label="Name" type="text"
                            fullWidth variant="standard" value={workout.name} 
                            onChange={(e) => setWorkout(prevWorkout => ({ ...prevWorkout, name: e.target.value }))} />
                        {workout.exercises.map(exercise => (
                            <Box key={exercise.id} sx={{ mt: 2, mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                                <Typography variant="h6">{exercise.name}</Typography>
                                <Button onClick={() => handleRemoveExercise(exercise.id)}>Remove</Button>
                            </Box>
                        ))}
                        <Button variant='outlined' onClick={() => handleAddExerciseClick()} fullWidth>Add Exercise</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%'}}>
                        <Button onClick={onClose} variant="outlined">Cancel</Button>
                        <Button onClick={onSave} fullWidth variant="contained" >{workout.id == 0 ? "Add" : "Save"}</Button>
                    </div>
                </DialogActions>
            </Dialog>
            <ExercisePickerDialog open={openExercisePickerDialog} onClose={handleCloseExercisePickerDialog} selectedExercises={workout.exercises} onExerciseSelected={onExerciseSelected} />

        </>
    )
}
