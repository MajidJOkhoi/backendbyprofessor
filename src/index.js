// src/index.js

const connectDB = require("./db/index");
const dotenv = require("dotenv");
const app = require("./app");

// Load environment variables from .env file
dotenv.config();

// Ensure environment variables are loaded
const PORT = process.env.PORT || 3000;

// Function to start the server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Handle server errors
  app.on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
  });
};

// Connect to the database and start the server
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    startServer();
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
