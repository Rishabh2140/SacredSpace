// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // enable if using cookies or authentication headers
  })
);

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/virtual-pandal"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    console.log("Server will continue running without database connection");
    console.log("Please configure MONGODB_URI in your .env file");
  }
};

// Connect to database
connectDB();

// --------------------
// Routes for Users only
// --------------------
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/spaces", require("./routes/spaceRoutes"));
// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "SacredSpace API (Users only) is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
