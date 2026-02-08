const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  applyToJob,
  getApplications,
  updateStatus,
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/:jobId", auth, applyToJob); // candidate
router.get("/", auth, admin, getApplications); // admin
router.put("/:id", auth, admin, updateStatus); // admin

module.exports = router;
