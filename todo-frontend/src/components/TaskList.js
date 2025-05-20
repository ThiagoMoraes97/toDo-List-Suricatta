import * as Material from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTask } from '../hooks/useTask';

export function TaskList({ tasks }) {

    const {contextStates, toggleTaskComplete, deleteTask, setEditingTask, setOpenDialog} = useTask();

    const { tabValue } = contextStates;


    if (tasks.length === 0) {
      return (
        <Material.Paper className="empty-state" sx={{ p: 3 }}>
          <Material.Typography variant="h6" gutterBottom>
            Nenhuma tarefa encontrada
          </Material.Typography>
          <Material.Typography variant="body2" color="textSecondary">
            {tabValue === 0 ? 'Adicione sua primeira tarefa usando o formulário acima.' :
             tabValue === 1 ? 'Não há tarefas ativas no momento.' :
             'Não há tarefas concluídas no momento.'}
          </Material.Typography>
        </Material.Paper>
      );
    }
    
    return (

      <Material.List>
        {tasks.map((task) => (
          <Material.ListItem
            key={task._id}
            sx={{
              backgroundColor: task.completed ? '#f5f5f5' : 'white',
              mb: 1,
              borderRadius: 1,
              border: '1px solid #e0e0e0'
            }}
          >
            <Material.Checkbox
              checked={task.completed}
              onChange={() => toggleTaskComplete(task._id)}
            />
            <Material.ListItemText
              primary={task.title}
              secondary={task.description}
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.6 : 1
              }}
            />
            <Material.ListItemSecondaryAction>
              <Material.IconButton
                edge="end"
                onClick={() => {
                  setEditingTask(task);
                  setOpenDialog(true);
                }}
              >
                <EditIcon />
              </Material.IconButton>
              <Material.IconButton
                edge="end"
                onClick={() => deleteTask(task._id)}
              >
                <DeleteIcon />
              </Material.IconButton>
            </Material.ListItemSecondaryAction>
          </Material.ListItem>
        ))}
      </Material.List>
    );
}