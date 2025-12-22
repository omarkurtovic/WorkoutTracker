import React from "react";
import type { Exercise } from "../../types";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";

interface ExercisePickerDialogProps {
    open: boolean;
    onClose: () => void;
    selectedExercises: Exercise[];
    onExerciseSelected: (exercise: Exercise) => void;
}

export default function ExercisePickerDialog({ open, onClose, selectedExercises, onExerciseSelected }: ExercisePickerDialogProps) {

    const [allExercises, setAllExercises] = React.useState<Exercise[]>([]);
    const [filteredExercises, setFilteredExercises] = React.useState<Exercise[]>([]);
    const [selectedExercise, setSelectedExercise] = React.useState<Exercise | null>(null);

    React.useEffect(() => {
        const fetchExercises = async () => {
            const url = `http://localhost:5103/exercises`;
            try {
                const response = await fetch(url, { method: 'GET' });
                if (!response.ok) {
                    alert("Error getting exercises!");
                    console.error('Failed to get exercises:', response.statusText);
                    onClose();
                    return;
                }

                let data: Exercise[] = await response.json();
                if (data.length == 0) {
                    alert("No exercises available. Please add exercises first.");
                    onClose();
                    return;
                }

                setAllExercises(data.filter(ex => !selectedExercises.find(sel => sel.id === ex.id)));
                setFilteredExercises(data.filter(ex => !selectedExercises.find(sel => sel.id === ex.id)));
                setSelectedExercise(null);

            } catch (error) {
                alert("Error getting exercises!");
                console.error('Error getting exercises:', error);
                onClose();
            }
        }

        fetchExercises();
    }, [open]);

    function onFilterChanged(e: React.ChangeEvent<HTMLInputElement>) {
        const term = e.target.value.toLowerCase();
        setFilteredExercises(allExercises.filter(exercise =>
            exercise.name.toLowerCase().includes(term) ||
            (exercise.targetMuscle && exercise.targetMuscle.toLowerCase().includes(term))));
    }

    function setSelected(exercise: Exercise) {
        if (selectedExercise === exercise) {
            setSelectedExercise(null);
        }
        else{
            setSelectedExercise(exercise);
        }
    }

    function handleAddExercise() {
        if (!selectedExercise) {
            alert("Please select an exercise to add.");
            return;
        }

        onExerciseSelected(selectedExercise);
        onClose();
    }


    return <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Pick Exercise</DialogTitle>
        <DialogContent>
            <Stack spacing={3} marginTop={2}>
                <TextField onChange={onFilterChanged} fullWidth placeholder="Search exercises"></TextField>
                <Stack spacing={1} maxHeight={500} overflow="auto">
                    {filteredExercises.map(exercise => (
                        <div key={exercise.id}
                            onClick={() => setSelected(exercise)}
                            style={{
                                padding: '16px',
                                margin: '8px 0',
                                border: selectedExercise === exercise ? '2px solid #1976d2' : '2px solid #e0e0e0',
                                borderRadius: '8px',
                                boxShadow: selectedExercise === exercise ? '0 0 0 3px rgba(25, 118, 210, 0.2)' : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {exercise.name}
                        </div>
                    ))}
                </Stack>
            </Stack>
        </DialogContent>
        <DialogActions>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%'}}>
                <Button onClick={onClose} variant="outlined">Cancel</Button>
                <Button onClick={handleAddExercise} fullWidth variant="contained" disabled={!selectedExercise}>Add</Button>
            </div>

        </DialogActions>

    </Dialog>;
}
