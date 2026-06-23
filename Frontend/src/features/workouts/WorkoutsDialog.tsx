import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Exercise, Workout, WorkoutExercise, WorkoutExerciseSet } from '../../types';
import { Box, Stack, Typography } from '@mui/material';
import ExercisePickerDialog from './ExercisePickerDialog';
import { useAlert } from '../../contexts/AlertContext';


interface WorkoutDialogProps {
    open: boolean;
    onClose: () => void;
    id: number;
}

export default function WorkoutDialog(workoutDialogProps: WorkoutDialogProps) {

    const [workout, setWorkout] = React.useState<Workout>({ id: 0, name: "", workoutExercises: [] });
    const [openExercisePickerDialog, setOpenExercisePickerDialog] = React.useState(false);
    const { showAlert, showSuccess } = useAlert();

    React.useEffect(() => {

        const fetchWorkout = async () => {
            if (workoutDialogProps.id === 0) {
                setWorkout({ id: 0, name: "",  workoutExercises: [] });
                return;
            }
            const url = `http://localhost:5103/workouts/${workoutDialogProps.id}`;
            try {
                const response = await fetch(url, { method: 'GET' });
                if (!response.ok) {
                    showAlert("Error getting workout!");
                    console.error('Failed to get workout:', response.statusText);
                    workoutDialogProps.onClose();
                    return;
                }

                const data = await response.json();
                setWorkout(data);

            } catch (error) {
                console.error('Error getting workout:', error);
                showAlert("Error getting workout!");
                workoutDialogProps.onClose();
            }
        }

        fetchWorkout();
    }, [workoutDialogProps.open, workoutDialogProps.id]);


    function handleRemoveExercise(exercise: WorkoutExercise) {
        setWorkout(prevWorkout => ({
            ...prevWorkout,
            workoutExercises: prevWorkout.workoutExercises.filter(ex => ex !== exercise)
        }));
    }

    
    const handleAddExerciseClick = () => {
        setOpenExercisePickerDialog(true);
    };

    function handleCloseExercisePickerDialog() {
        setOpenExercisePickerDialog(false);
    }

    function onExerciseSelected(exercise: Exercise) {
        if(workout.workoutExercises.find(ex => ex.id === exercise.id)){
            return;
        }
        const workoutExercise = {
            id: Math.max(0, ...workout.workoutExercises.map(ex => ex.id)) + 1,
            exerciseId: exercise.id,
            exerciseName: exercise.name,
            workoutExerciseSets: []
        } as WorkoutExercise;

        setWorkout(prevWorkout => ({
            ...prevWorkout,
            workoutExercises: [...prevWorkout.workoutExercises, workoutExercise]
        }));
    }

    async function onSave(){
        if(workout.name.trim() === ""){
            alert("Please enter a name for the workout.");
            return;
        }

        if(workout.workoutExercises.length === 0){
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
            showAlert("Error saving workout!");
            console.error('Failed to save workout:', response.statusText);
          }
          else{
            showSuccess("Workout saved successfully!");
          }
        }
        catch (error) {
          console.error('Error saving workout:', error);
          showAlert("Error saving workout!");
        }

        workoutDialogProps.onClose();
    }

    function handleAddSet(workoutExercise: WorkoutExercise){
        
        const workoutExerciseIndex = workout.workoutExercises.findIndex(ex => ex == workoutExercise);
        if(workoutExerciseIndex === -1){
            return;
        }

        const nextId = Math.max(0, ...workout.workoutExercises[workoutExerciseIndex].workoutExerciseSets.map(s => s.id)) + 1;
        if(workout.workoutExercises[workoutExerciseIndex].workoutExerciseSets.length === 0){
            workout.workoutExercises[workoutExerciseIndex].workoutExerciseSets.push({ id: nextId, repetitions: 0, weight: 0 });
        }
        else{
            const lastSet = workout.workoutExercises[workoutExerciseIndex].workoutExerciseSets[workout.workoutExercises[workoutExerciseIndex].workoutExerciseSets.length -1];
            workout.workoutExercises[workoutExerciseIndex].workoutExerciseSets.push({ id: nextId, repetitions: lastSet.repetitions, weight: lastSet.weight });
        }
        
        setWorkout(prevWorkout => ({
            ...prevWorkout,
            workoutExercises: [...workout.workoutExercises]
        }));
    }

    function handleRepsChange(workoutExercise: WorkoutExercise, set: WorkoutExerciseSet, value: number){
        const exerciseIndex = workout.workoutExercises.findIndex(ex => ex == workoutExercise);
        if(exerciseIndex === -1){
            return;
        }
        const setIndex = workout.workoutExercises[exerciseIndex].workoutExerciseSets.findIndex(s => s == set);
        if(setIndex === -1){
            return;
        }

        const newWorkout = { ...workout };
        newWorkout.workoutExercises[exerciseIndex].workoutExerciseSets[setIndex].repetitions = value;
        setWorkout(newWorkout);
    }

    function handleWeightChange(workoutExercise: WorkoutExercise, set: WorkoutExerciseSet, value: number){
        const exerciseIndex = workout.workoutExercises.findIndex(ex => ex == workoutExercise);
        if(exerciseIndex === -1){
            return;
        }

        const setIndex = workout.workoutExercises[exerciseIndex].workoutExerciseSets.findIndex(s => s == set);
        if(setIndex === -1){
            return;
        }

        const newWorkout = { ...workout };
        newWorkout.workoutExercises[exerciseIndex].workoutExerciseSets[setIndex].weight = value;
        setWorkout(newWorkout);
    }

    return (
        <>
            <Dialog open={workoutDialogProps.open} onClose={workoutDialogProps.onClose} maxWidth="sm" fullWidth PaperProps={{sx: { maxHeight: '80vh', },}}>
                <DialogTitle>{workoutDialogProps.id === 0 ? "Add Workout" : "Edit Workout"}</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} marginTop={2}>
                        <TextField autoFocus required margin="dense"
                            id="name" name="name" label="Name" type="text"
                            fullWidth variant="standard" value={workout.name} 
                            onChange={(e) => setWorkout(prevWorkout => ({ ...prevWorkout, name: e.target.value }))} />
                        {workout.workoutExercises.map(exercise => (
                            <Box key={exercise.id} sx={{ mt: 2, mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                                <Stack direction="column" spacing={2} justifyContent="space-between">
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                        <Typography variant="h6">{exercise.exerciseName}</Typography>
                                        <Button onClick={() => handleRemoveExercise(exercise)} color="error" variant="outlined">Remove</Button>
                                    </div>
                                    {exercise.workoutExerciseSets.map(set => (
                                        <Stack key={set.id} direction="row" spacing={2} alignItems="center" sx={{ mt: 1, mb: 1 }}>
                                            <TextField type='number' value={set.repetitions} label='Repetitions' onChange={(e) => handleRepsChange(exercise, set, Number(e.target.value))} />
                                            <TextField type='number' value={set.weight} label='Weight' onChange={(e) => handleWeightChange(exercise, set, Number(e.target.value))} />
                                        </Stack>
                                    ))}
                                    <Button variant='outlined' onClick={() => handleAddSet(exercise)} >Add Set</Button>
                                </Stack>
                            </Box>
                        ))}
                        <Button variant='outlined' onClick={() => handleAddExerciseClick()} fullWidth>Add Exercise</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%'}}>
                        <Button onClick={workoutDialogProps.onClose} variant="outlined">Cancel</Button>
                        <Button onClick={onSave} fullWidth variant="contained" >{workout.id == 0 ? "Add" : "Save"}</Button>
                    </div>
                </DialogActions>
            </Dialog>
            <ExercisePickerDialog open={openExercisePickerDialog} onClose={handleCloseExercisePickerDialog} selectedExercises={workout.workoutExercises.map(we => ({ id: we.exerciseId, name: we.exerciseName, targetMuscle: "" }))} onExerciseSelected={onExerciseSelected} />

        </>
    )
}
