require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const searchRoute = require("./api/search");
app.use("/api", searchRoute);

app.get("/", (req, res) => {
  res.send("Dealfury Backend Running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
