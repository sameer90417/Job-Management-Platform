const Application = require("../models/Application");

exports.applyToJob = async (req, res) => {
  const application = await Application.create({
    job: req.params.jobId,
    applicant: req.user.id,
    resumeUrl: req.body.resumeUrl,
  });

  res.status(201).json(application);
};

exports.getApplications = async (req, res) => {
  const applications = await Application.find()
    .populate("job", "title company")
    .populate("applicant", "name email");

  res.json(applications);
};

exports.updateStatus = async (req, res) => {
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(application);
};
