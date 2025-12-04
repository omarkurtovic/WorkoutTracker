import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

function Exercises() {

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Exercises
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />}>Add</Button>
    </>
  )
}

export default Exercises
