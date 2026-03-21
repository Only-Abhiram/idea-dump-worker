const express = require("express");
const cors = require("cors");

const problemRoutes = require("./routes/problemRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/problems", problemRoutes);
app.get('/ping', (req, res)=>{
    res.status(200).send("All okay!");
})
module.exports = app;