const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const User = require("../models/User");
const auth = require("../middleware/auth");

router.post(
  "/upload-resume",
  auth,
  upload.single("resume"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.resume = req.file.path;
      await user.save();

      res.json({
        message: "Resume uploaded successfully",
        resume: req.file.path,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
