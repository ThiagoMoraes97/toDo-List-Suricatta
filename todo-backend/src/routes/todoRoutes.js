const {Router} = require('express');
const router = Router();
const todoController = require('../controllers/todoController');

router.get('/tasks', todoController.getAllTodos);
router.post('/tasks', todoController.createTodo);
router.get('/tasks/:id', todoController.getTodoById);
router.put('/tasks/:id', todoController.updateTodo);
router.delete('/tasks/:id', todoController.deleteTodo);

module.exports = router;
