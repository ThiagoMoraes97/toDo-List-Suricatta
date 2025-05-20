import { useState } from 'react';
import '../../style/App.css';
import { TaskList } from '../../components/TaskList';
import * as Material from '@mui/material';
import { TabPanel } from '../../components/TabPanel';
import { useTask } from '../../hooks/useTask';
import { Dialog } from './components/Dialog';
import { Paper } from './components/Paper';

export function App() {  
  const [tabValue, setTabValue] = useState(0);

  const { contextStates, fetchTasks } = useTask();
  const { tasks, loading, error } = contextStates;
 
  const filteredTasks = tasks.filter(task => {
    if (tabValue === 0) return true; 
    if (tabValue === 1) return !task.completed;
    if (tabValue === 2) return task.completed; 
    return true;
  });

  return (
    <Material.Container maxWidth="md">
      <Material.Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4 }}>
        Todo List
      </Material.Typography>

      <Paper />

      <Material.Paper sx={{ mb: 3 }}>
        <Material.Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Material.Tab label={`All (${tasks.length})`} />
          <Material.Tab label={`Active (${tasks.filter(t => !t.completed).length})`} />
          <Material.Tab label={`Completed (${tasks.filter(t => t.completed).length})`} />
        </Material.Tabs>
      </Material.Paper>

      {error && (
        <Material.Paper className="error-message" sx={{ mb: 3, p: 2 }}>
          <Material.Typography>{error}</Material.Typography>
          <Material.Button variant="outlined" sx={{ mt: 1 }} onClick={fetchTasks}>
            Tentar novamente
          </Material.Button>
        </Material.Paper>
      )}

      {loading ? (
        <Material.Paper className="loading-indicator" sx={{ p: 3 }}>
          <Material.Typography>Carregando tarefas...</Material.Typography>
        </Material.Paper>
      ) : (
        <>
          <TabPanel value={tabValue} index={0}>
            <TaskList tasks={filteredTasks} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <TaskList tasks={filteredTasks} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <TaskList tasks={filteredTasks} />
          </TabPanel>
        </>
      )}

      <Dialog />

    </Material.Container>
  ); 
}