import express from "express";
import task from '../controller/taskController.js'

const router = express.Router();
router.get('/tasks',task.getTasks);
router.post('/tasks',task.addTask);
router.delete('/tasks/:id',task.deleteTask);
router.put('/tasks/:id',task.updateTask);
export default router;