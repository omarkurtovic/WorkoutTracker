import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Exercise } from '../types';
import SuccessAlert from './shared/components/SuccessAlert';
import ErrorAlert from './shared/components/ErrorAlert';


interface ExerciseDialogProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

export default function ExerciseDialog({ open, onClose, id=0 }: ExerciseDialogProps) {

  const [name, setName] = React.useState("");
  const [targetMuscle, setTargetMuscle] = React.useState("");
  const [description, setDescription] = React.useState("");


  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const exercise: Exercise = {
      id: id,
      name: name,
      targetMuscle: targetMuscle,
      description: description || undefined,
    };

    try {
      let url = "";
      let method = "";
      if(id === 0){
        url = `http://localhost:5103/exercises`;
        method = "POST";
      }
      else{
        url = `http://localhost:5103/exercises/${id}`;
        method = "PUT";
      }
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
      });
      if (!response.ok) {
        setErrorMessage("Error saving exercise!");
        console.error('Failed to save exercise:', response.statusText);
      }
      else{
        setSuccessMessage("Exercise saved successfully!");
      }
    }
    catch (error) {
      console.error('Error saving exercise:', error);
      setErrorMessage("Error saving exercise!");
    }

    onClose();
  };

    React.useEffect(() => {
      const fetchData = async () => {
        if (id === 0){
          setName("");
          setTargetMuscle("");
          setDescription("");
          return;
        }

         const url = `http://localhost:5103/exercises/${id}`;
          try {
            const response = await fetch(url, {method: 'GET'});
            if (!response.ok) {
              setErrorMessage("Error getting exercise!");
              console.error('Failed to get exercise:', response.statusText);
              onClose();
              return; 
            }
            
            let data = await response.json();
            setName(data.name);
            setTargetMuscle(data.targetMuscle);
            setDescription(data.description || "");

            } catch (error) {
              console.error('Error getting exercise:', error);
              setErrorMessage("Error getting exercise!");
              onClose();
            }
          }

          fetchData();
      }, [open, id]);

  return (
    <>
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{id === 0 ? "Add Exercise" : "Edit Exercise"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField autoFocus required margin="dense"
              id="name" name="name" label="Name" type="text"
              fullWidth variant="standard" value={name} onChange={(e) => setName(e.target.value)}/>
            <TextField margin="dense" required
              id="target-muscle" name="target-muscle" label="Target Muscle" type="text"
              fullWidth variant="standard" value={targetMuscle} onChange={(e) => setTargetMuscle(e.target.value)} />
            <TextField margin="dense"
              id="description" name="description" label="Description" type="text"
              fullWidth variant="standard" value={description} onChange={(e) => setDescription(e.target.value)} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <SuccessAlert message={successMessage} />
      <ErrorAlert message={errorMessage} />
      </>
  )
}
