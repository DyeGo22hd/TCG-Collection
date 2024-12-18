const express = require('express');
const path = require('path');
const app = express();
const pool = require('./db');


// Middleware for JSON
app.use(express.json());



// Import routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const collectionRoutes = require('./routes/collection');

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Use routes
app.use('/api', apiRoutes); // Register API routes here
app.use('/api/auth', authRoutes);
app.use('/api/collection', collectionRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
