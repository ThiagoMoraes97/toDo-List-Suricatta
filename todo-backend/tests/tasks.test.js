const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/Todo');

jest.mock('../src/models/Todo');

describe('Tasks API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /tasks', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { _id: '1', title: 'Task 1', completed: false },
        { _id: '2', title: 'Task 2', completed: true }
      ];
      
      Task.find.mockResolvedValue(mockTasks);

      const response = await request(app).get('/tasks');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTasks);
    });

    it('should filter tasks by completed status', async () => {
      const completedTasks = [{ _id: '2', title: 'Task 2', completed: true }];
      
      Task.find.mockImplementation((query) => {
        return Promise.resolve(query && query.completed ? completedTasks : [
          { _id: '1', title: 'Task 1', completed: false },
          { _id: '2', title: 'Task 2', completed: true }
        ]);
      });

      const response = await request(app).get('/tasks?completed=true');
      
      expect(response.status).toBe(200);
      expect(Task.find).toHaveBeenCalledWith({ completed: true });
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const newTask = { title: 'New Task', description: 'Task description' };
      const savedTask = { _id: '3', ...newTask, completed: false };

      Task.create.mockResolvedValue(savedTask);

      const response = await request(app).post('/tasks').send(newTask);
      
      expect(response.status).toBe(201);
      expect(response.body.title).toBe(newTask.title);
    });

    it('should return 400 for invalid task data', async () => {
      Task.create.mockRejectedValue(new Error('Validation error'));

      const response = await request(app).post('/tasks').send({ description: 'No title' });
      
      expect(response.status).toBe(400);
    });
  });

  describe('PUT /tasks/:id', () => {
    it('should update a task', async () => {
      const updatedTask = { _id: '1', title: 'Updated Task', completed: true };

      Task.findByIdAndUpdate.mockResolvedValue(updatedTask);

      const response = await request(app).put('/tasks/1').send({ title: 'Updated Task', completed: true });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedTask);
    });

    it('should return 404 for non-existent task', async () => {
      Task.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app).put('/tasks/999').send({ title: 'Updated Task' });
      
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a task', async () => {
      Task.findByIdAndDelete.mockResolvedValue({ _id: '1' });

      const response = await request(app).delete('/tasks/1');
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Task deleted successfully');
    });

    it('should return 404 for non-existent task', async () => {
      Task.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete('/tasks/999');
      
      expect(response.status).toBe(404);
    });
  });
});
