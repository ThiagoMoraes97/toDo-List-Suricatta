import { createTheme } from '@mui/material/styles';

// Tema personalizado com as cores especificadas
export const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
        dark: '#1565c0',
      },
      background: {
        default: '#f5f5f5',
      },
      text: {
        primary: '#333',
        secondary: '#666',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h3: {
        fontSize: '32px',
        fontWeight: 500,
      },
      h6: {
        fontSize: '18px',
      },
      body1: {
        fontSize: '16px',
      },
      body2: {
        fontSize: '14px',
      },
    },
  });