import { render, screen } from '@testing-library/react';
import { App } from './pages/App/App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './style/theme';
import { TaskProvider } from './Context/TaskContext';

test('renders Todo List title', () => {
  render(
    <ThemeProvider theme={theme}>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ThemeProvider>
  );
  const titleElement = screen.getByText(/Todo List/i);
  expect(titleElement).toBeInTheDocument();
});
