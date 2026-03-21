const express = require("express");
const cors = require("cors");

const problemRoutes = require("./routes/problemRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/problems", problemRoutes);
app.get("/", (req, res)=>{
    res.send(process.env.GEMINI_API_KEY+process.env.MONGO_URI);
    
})
module.exports = app;