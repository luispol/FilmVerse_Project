// Import the required modules/packages
import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv';
import usuariosRoutes from './routes/usuarioRoutes.js'
import cors from "cors";

// ROUTES
import movieRoutes from "./routes/moviesRoutes.js";

// Configuration
const app = express(); // Create an instance of Express application
app.use(express.json()); // Add middleware to parse incoming JSON data
dotenv.config(); // Load environment variables from .env file

// configuracion de cors
const whiteList = ['http://localhost:3001'];

const corsOptions ={
    origin: function (origin, callback){
        if(whiteList.includes(origin)){
            // primer parametro es un error, el segundo es el que da una entrada
            callback(null, true)
        } else{
            callback(new Error("Error de cors"));
        }
    }
}

// middleware

// limitar los servidores.
//app.use(cors(corsOptions));

// todos los servidores
app.use(cors())
// Database connection
conectarDB(); // Connect to the MongoDB database using the conectarDB function
const PORT = process.env.PORT || 3001; // Get the port number from environment variables or use 3001 as default
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`); // Start the Express server and log a message to indicate the server is running
});

// routes
// MOVIES
app.use('/api/movies', movieRoutes);

// USERS
app.use('/api/usuarios', usuariosRoutes)

