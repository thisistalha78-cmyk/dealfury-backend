require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Debug: Show if API key loaded
console.log("LOADED OPENROUTER KEY:", process.env.OPENROUTER_API_KEY ? "YES" : "NO");

// Routes
const searchRoute = require("./api/search");
app.use("/api", searchRoute);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});
