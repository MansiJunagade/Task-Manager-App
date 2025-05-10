const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, assignedTo } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      createdBy: req.user._id,
      assignedTo,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Task creation failed' });
  }
};

// controllers/taskController.js
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure authMiddleware sets this
    const tasks = await Task.find({ assignedTo: userId })
      .populate('assignedTo', 'name email'); // Optional populate
    res.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};