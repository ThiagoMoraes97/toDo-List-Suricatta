const Todo = require('../models/Todo');

// Controlador para operações de tarefas (todos)
const todoController = {
  // Obter todas as tarefas
  getAllTodos: async (req, res) => {
    try {
      const { completed } = req.query;
      const filter = {};
      
      // Adicionar filtro por status completed se fornecido
      if (completed !== undefined) {
        filter.completed = completed === 'true';
      }
      
      const todos = await Todo.find(filter);
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: true, message: error.message });
    }
  },

  // Criar uma nova tarefa
  createTodo: async (req, res) => {
    try {
      const { title, description, completed } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: true, message: 'O título da tarefa é obrigatório' });
      }

      const newTodo = await Todo.create({
        title,
        description: description || '',
        completed: completed || false
      });

      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: true, message: error.message });
    }
  },

  // Obter uma tarefa pelo ID
  getTodoById: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);

      if (!todo) {
        return res.status(404).json({ error: true, message: 'Tarefa não encontrada' });
      }

      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: true, message: error.message });
    }
  },

  // Atualizar uma tarefa
  updateTodo: async (req, res) => {
    try {
      const { title, description, completed } = req.body;
      const todo = await Todo.findById(req.params.id);
      
      if (!todo) {
        return res.status(404).json({ error: true, message: 'Tarefa não encontrada' });
      }

      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (completed !== undefined) updateData.completed = completed;
      
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: true, message: error.message });
    }
  },

  // Excluir uma tarefa
  deleteTodo: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);

      if (!todo) {
        return res.status(404).json({ error: true, message: 'Tarefa não encontrada' });
      }
      
      await Todo.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: true, message: error.message });
    }
  }
};

module.exports = todoController;