import Job from "../models/Job.js";

export const getJobsService = async ({
  keyword,
  location,
  page,
  limit,
}) => {
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
    .lean()
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Job.countDocuments(query);

  return {
    jobs,
    total,
    pages: Math.ceil(total / limit),
  };
};
