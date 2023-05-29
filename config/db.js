import mongoose from "mongoose";

// Function to connect to the MongoDB database
const conectarDB = async () => {
  try {
    // Connect to the MongoDB database using the provided MONGO_URI
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    });

    // Get the host and port of the connected MongoDB instance
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`Mongodb conectado en: ${url}`);
  } catch (error) {
    // Handle any errors that occurred during database connection
    console.log(`Error en conexionDB: ${error.message}`);
    process.exit(1); // Exit the Node.js process with a non-zero code to indicate an error
  }
};

// it is nece
export default conectarDB;
