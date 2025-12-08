const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// API
app.use("/api", require("./api/search"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Backend running on port", PORT));
