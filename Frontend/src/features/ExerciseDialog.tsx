import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Exercise } from '../types';


interface ExerciseDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ExerciseDialog({ open, onClose }: ExerciseDialogProps) {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const exercise: Exercise = {
            id: 0,
            name: formData.get('name') as string,
            targetMuscle: formData.get('target-muscle') as string,
            description: formData.get('description') as string || undefined,
        };

        console.log('Submitting exercise:', exercise);
        
        const response = await fetch('http://localhost:5103/exercises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exercise),
        });

        if (response.ok) {
            onClose();
        }
    };

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Exercise</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField autoFocus required margin="dense"
              id="name" name="name" label="Name" type="text"
              fullWidth variant="standard" />
            <TextField margin="dense" required
              id="target-muscle" name="target-muscle" label="Target Muscle" type="text"
              fullWidth variant="standard" />
            <TextField margin="dense"
              id="description" name="description" label="Description" type="text"
              fullWidth variant="standard" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  )
}
