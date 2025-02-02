// test-db.js
const mongoose = require('mongoose');

// Replace with your actual MongoDB connection string
const dbUri = 'your-mongo-db-connection-string'; // Example: 'mongodb://localhost:27017/yourdbname'

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to the database!');
    mongoose.disconnect(); // Disconnect after the test
  })
  .catch(err => {
    console.error('Failed to connect to the database', err);
  });

  