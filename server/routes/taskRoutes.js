const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Assign new task
router.post('/', async (req, res) => {
  try {
    const task = new Task({
      title: `Week ${req.body.week} Tasks`,
      description: req.body.description,
      deadline: new Date(req.body.deadline),
      assignedTo: req.body.teachers
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get completion analytics
router.get('/analytics', async (req, res) => {
  const tasks = await Task.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
  res.json(tasks);
});

module.exports = router;