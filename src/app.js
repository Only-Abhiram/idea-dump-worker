const express = require("express");
const cors = require("cors");

const problemRoutes = require("./routes/problemRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/problems", problemRoutes);

module.exports = app;