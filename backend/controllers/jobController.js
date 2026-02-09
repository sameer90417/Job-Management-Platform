const Job = require("../models/Job");
const { getJobsService } = require("../services/jobService");

exports.createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json(job);
};

exports.getJobs = async (req, res) => {
  const { keyword, location, page = 1, limit = 5 } = req.query;

  const data = await getJobsService({
    keyword,
    location,
    page: Number(page),
    limit: Number(limit),
  });

  res.json(data);
};

exports.getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
};

exports.updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
};
