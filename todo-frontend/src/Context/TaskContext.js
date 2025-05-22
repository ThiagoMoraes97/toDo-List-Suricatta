import { createContext, useEffect, useState } from "react";
import { api } from "../resources/api";

export const TaskContext = createContext({});

export function TaskProvider({children}) {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [editingTask, setEditingTask] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const contextStates = {
        tasks,
        loading,
        error,
        newTask,
        editingTask,
        openDialog,
    }

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
        const response = await api.get(`/tasks`);
        setTasks(response.data);
        } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Não foi possível carregar as tarefas. Por favor, tente novamente.');
        } finally {
        setLoading(false);
        }
    };

    const createTask = async () => {
        if (!newTask.title.trim()) return;
        
        setError(null);
        try {
        const response = await api.post(`/tasks`, newTask);
        console.log(response)
        setTasks([response.data, ...tasks]);
        setNewTask({ title: '', description: '' });
        } catch (error) {
        console.error('Error creating task:', error);
        setError('Não foi possível adicionar a tarefa. Por favor, tente novamente.');
        }
    };

    const updateTask = async () => {
        try {
        const response = await api.put(
            `/tasks/${editingTask._id}`,
            editingTask
        );
        setTasks(tasks.map(task => 
            task._id === editingTask._id ? response.data : task
        ));
        setEditingTask(null);
        setOpenDialog(false);
        } catch (error) {
        console.error('Error updating task:', error);
        }
    };

    const toggleTaskComplete = async (taskId) => {
        const task = tasks.find(t => t._id === taskId);
        try {
        const response = await api.put(
            `/tasks/${taskId}`,
            { ...task, completed: !task.completed }
        );
        setTasks(tasks.map(t => 
            t._id === taskId ? response.data : t
        ));
        } catch (error) {
        console.error('Error toggling task:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
        await api.delete(`/tasks/${taskId}`);
        setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
        console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
     fetchTasks();
    }, []);


    return(
        <TaskContext.Provider value={{contextStates, createTask, updateTask, toggleTaskComplete, deleteTask, setEditingTask, setOpenDialog, setNewTask}}>
            {children}
        </TaskContext.Provider>
    )
}