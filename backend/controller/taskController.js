import Task from '../models/taskModel.js'
import TryCatch from '../utils/TryCatch.js'

const getTasks = TryCatch(async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ task: tasks });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

const addTask = TryCatch(async (req, res) => {
    try {
        const { brief, description, status } = req.body;
        
        if (!brief || !description || !status) {
            return res.status(400).json({ message: "Please provide all the details" });
        }

        const task = await Task.create({ brief, description, status });

        return res.status(200).json({task:task});
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

const deleteTask = TryCatch(async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(400).json({ message: "Task not found" });
        }
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

const updateTask = TryCatch(async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id);
        if (!task) {
            return res.status(400).json({ message: "Task not found" });
        }
        task.brief = req.body.brief;
        task.description = req.body.description;
        task.status = req.body.status;
        await task.save();
        return res.status(200).json({task:task});
    } catch (error) {
        return res.status(400).json({ message: error.message });

    }
})

export default { getTasks, addTask, deleteTask, updateTask };