import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <App />
    </Container>
  </StrictMode>,
)
