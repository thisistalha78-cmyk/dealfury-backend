require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Debug
console.log("LOADED OPENROUTER KEY:", process.env.OPENROUTER_API_KEY ? "YES" : "NO");

// Import API routes
const searchRoute = require("./api/search");

// Use route
app.use("/api", searchRoute);

// Root route
app.get("/", (req, res) => {
    res.send("Dealfury Backend Running");
});

// Render requires this:
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
