import * as Material from '@mui/material';
import { useTask } from '../../../hooks/useTask';
import AddIcon from '@mui/icons-material/Add';

export function Paper() {

    const { contextStates, createTask, setNewTask } = useTask();
    const { newTask } = contextStates;

    return(
        <Material.Paper sx={{ p: 3, mb: 3 }}>
                <Material.Typography variant="h6" gutterBottom>
                  Add New Task
                </Material.Typography>
                <Material.TextField
                  fullWidth
                  label="Task Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <Material.TextField
                  fullWidth
                  label="Description (optional)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
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
        
    )
}