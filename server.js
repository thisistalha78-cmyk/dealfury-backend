const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Debug ENV
console.log("Loaded OPENROUTER KEY:", process.env.OPENROUTER_API_KEY ? "YES" : "NO");
console.log("Loaded SERPAPI KEY:", process.env.SERP_API_KEY ? "YES" : "NO");

// Routes
const searchRoute = require("./api/search");
app.use("/api", searchRoute);

// Root check
app.get("/", (req, res) => {
    res.send("Dealfury Backend is running ✅");
});

// Render port binding
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});
