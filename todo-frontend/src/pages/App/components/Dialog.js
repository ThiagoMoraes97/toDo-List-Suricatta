import * as Material from '@mui/material';
import { useTask } from '../../../hooks/useTask';

export function Dialog(){

     const { contextStates, updateTask } = useTask();
      const { editingTask, setEditingTask, openDialog, setOpenDialog } = contextStates;

    return (
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
    )
}