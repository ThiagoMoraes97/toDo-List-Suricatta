import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './pages/App/App';
import reportWebVitals from './reportWebVitals';
import '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import theme from './style/theme';
import { TaskProvider } from './Context/TaskContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
