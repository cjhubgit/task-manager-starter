const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Title is required
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],  // Status can either be 'pending' or 'completed'
    default: 'pending',  // Default is 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set the date when task is created
  }
});

const Task = mongoose.model('Task', taskSchema);  // Create the Task model

module.exports = Task;  // Export the Task model for use in other files
