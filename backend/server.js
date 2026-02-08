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

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/jobs", require("./routes/jobRoutes"));

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
