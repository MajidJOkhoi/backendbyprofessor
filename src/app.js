const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);

// Middleware to parse cookies from the request headers
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));
// Middleware to parse JSON request bodies
app.use(express.json({ limit: "20kb" }));


module.exports = app;
