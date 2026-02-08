const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);

router.post("/", auth, admin, createJob);
router.put("/:id", auth, admin, updateJob);
router.delete("/:id", auth, admin, deleteJob);

module.exports = router;
