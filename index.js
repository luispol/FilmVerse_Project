// Import the required modules/packages
import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv';

// ROUTES
import movieRoutes from "./routes/moviesRoutes.js";

// Configuration
const app = express(); // Create an instance of Express application
app.use(express.json()); // Add middleware to parse incoming JSON data
dotenv.config(); // Load environment variables from .env file

// Database connection
conectarDB(); // Connect to the MongoDB database using the conectarDB function
const PORT = process.env.PORT || 3001; // Get the port number from environment variables or use 3001 as default
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); // Start the Express server and log a message to indicate the server is running
});

// routes
// MOVIES
app.use('/api/movies', movieRoutes);
