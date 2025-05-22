import { useState } from 'react';
import '../../style/App.css';
import { TaskList } from '../../components/TaskList';
import * as Material from '@mui/material';
import { TabPanel } from '../../components/TabPanel';
import { useTask } from '../../hooks/useTask';
import AddIcon from '@mui/icons-material/Add';

export function App() {  
  const [tabValue, setTabValue] = useState(0);

  const { contextStates, fetchTasks, createTask, setNewTask, updateTask } = useTask();
  const { tasks, loading, error, newTask, editingTask, setEditingTask, openDialog, setOpenDialog } = contextStates;
 
  const filteredTasks = tasks.filter(task => {
    if (tabValue === 0) return true; 
    if (tabValue === 1) return !task.completed;
    if (tabValue === 2) return task.completed; 
    return true;
  });

  function handleNewTaskTitle(e) {
    setNewTask((prevState) => ({ ...prevState, title: e.target.value }));
  }

  function handleNewTaskDescription(e) {
    setNewTask((prevState) => ({ ...prevState, description: e.target.value }));
  }

  return (
    <Material.Container maxWidth="md">
      <Material.Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4 }}>
        Todo List
      </Material.Typography>

      <Material.Paper sx={{ p: 3, mb: 3 }}>
        <Material.Typography variant="h6" gutterBottom>
          Add New Task
        </Material.Typography>
        <Material.TextField
          fullWidth
          label="Task Title"
          value={newTask.title}
          onChange={handleNewTaskTitle}
          sx={{ mb: 2 }}
        />
        <Material.TextField
          fullWidth
          label="Description (optional)"
          value={newTask.description}
          onChange={handleNewTaskDescription}
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
        <Material.Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={createTask}
          disabled={!newTask.title.trim()}
        >
          Add Task
        </Material.Button>
      </Material.Paper>

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

      <Material.Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <Material.DialogTitle>Edit Task</Material.DialogTitle>
        <Material.DialogContent>
          <Material.TextField
            fullWidth
            label="Task Title"
            value={editingTask?.title || ''}
            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            sx={{ mb: 2, mt: 2 }}
          />
          <Material.TextField
            fullWidth
            label="Description"
            value={editingTask?.description || ''}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            multiline
            rows={3}
          />
        </Material.DialogContent>
        <Material.DialogActions>
          <Material.Button onClick={() => setOpenDialog(false)}>Cancel</Material.Button>
          <Material.Button onClick={updateTask} variant="contained">Save</Material.Button>
        </Material.DialogActions>
      </Material.Dialog>

    </Material.Container>
  ); 
}