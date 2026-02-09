const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const limiter = require("./middleware/rateLimit");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", limiter);


connectDB();

app.get("/", (req, res) => {
  res.send("Job Management Backend Running 🚀");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));


app.use("/uploads", express.static("uploads"));

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
