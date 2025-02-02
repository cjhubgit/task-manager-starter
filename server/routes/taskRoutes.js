const express = require('express');
const Task = require('../models/Task');  // Import the Task model
const router = express.Router();  // Create a new router for handling routes

// Route to create a new task (POST)
router.post('/', async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = new Task({
      title,
      description,
      status,
    });

    await task.save();  // Save the task to MongoDB

    res.status(201).json(task);  // Return the created task as JSON
  } catch (err) {
    res.status(400).json({ message: 'Error creating task', error: err });
  }
});

// Route to get all tasks (GET)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();  // Retrieve all tasks from MongoDB
    res.status(200).json(tasks);  // Return the tasks as JSON
  } catch (err) {
    res.status(400).json({ message: 'Error fetching tasks', error: err });
  }
});

// Route to delete a task by ID (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;  // Get the task ID from the URL parameters

  try {
    const task = await Task.findByIdAndDelete(id);  // Delete the task by ID
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting task', error: err });
  }
});

module.exports = router;  // Export the routes
