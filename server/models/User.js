const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'teacher'], default: 'teacher' },
  teacherId: { type: String, default: () => `T-${Math.floor(1000 + Math.random() * 9000)}` },
  tasksCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('User', userSchema);