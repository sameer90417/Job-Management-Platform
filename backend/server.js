const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Job Management Backend Running 🚀");
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
