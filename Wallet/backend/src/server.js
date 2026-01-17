// const express = require('express');

import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import router from "./routes/transactionRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(ratelimiter);
app.use(express.json());
app.use("/api/transactions", router);

// Start the server after initializing the database
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
