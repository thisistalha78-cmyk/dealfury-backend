const express = require("express");
const cors = require("cors");
const searchRoute = require("./api/search.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/search", searchRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Backend running on port " + PORT));
