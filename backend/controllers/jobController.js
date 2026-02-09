const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json(job);
};

exports.getJobs = async (req, res) => {
  const { keyword, location, page = 1, limit = 5 } = req.query;

  const query = {};

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { company: { $regex: keyword, $options: "i" } },
    ];
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  const jobs = await Job.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 })
    .populate("createdBy", "name email");

  const total = await Job.countDocuments(query);

  res.json({
    jobs,
    total,
    pages: Math.ceil(total / limit),
  });
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
