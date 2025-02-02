const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Import the Task model
const Task = require('./models/Task');

const taskRoutes = require('./routes/taskRoutes');  // Import the task routes


// Middleware to parse incoming JSON requests
app.use(express.json());  // This allows Express to parse JSON data

// MongoDB URI from the .env file
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MongoDB URI is not defined in the .env file!');
  process.exit(1);  // Exit the application if URI is missing
}

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    console.log('MongoDB URI:', process.env.MONGODB_URI);  // Log the MongoDB URI to ensure it's loaded correctly
  });

// Sample route to test the server
app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

// Route to create a new task
app.post('/tasks', async (req, res) => {
  const { title, description, status } = req.body;

  // Create a new task and save it to the database
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
