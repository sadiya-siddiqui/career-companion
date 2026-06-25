const Job = require('../models/Job');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Add a new job application
 * @route   POST /api/jobs
 * @access  Private
 */
const addJob = asyncHandler(async (req, res) => {
  const job = await Job.create({
    user: req.user._id,
    ...req.body,
  });

  res.status(201).json({
    success: true,
    message: 'Job application added successfully',
    data: { job },
  });
});

/**
 * @desc    Get all job applications for the authenticated user
 *          Supports optional filtering by status and pagination via query params
 * @route   GET /api/jobs?status=Applied&page=1&limit=10
 * @access  Private
 */
const getJobs = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10, sort = '-createdAt' } = req.query;

  const filter = { user: req.user._id };
  if (status) {
    filter.status = status;
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
  const skip = (pageNum - 1) * limitNum;

  const [jobs, total] = await Promise.all([
    Job.find(filter).sort(sort).skip(skip).limit(limitNum),
    Job.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: jobs.length,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum) || 1,
    data: { jobs },
  });
});

/**
 * @desc    Get a single job application by id
 * @route   GET /api/jobs/:id
 * @access  Private
 */
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, user: req.user._id });

  if (!job) {
    res.status(404);
    throw new Error('Job application not found');
  }

  res.status(200).json({
    success: true,
    data: { job },
  });
});

/**
 * @desc    Update a job application (general fields)
 * @route   PUT /api/jobs/:id
 * @access  Private
 */
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, user: req.user._id });

  if (!job) {
    res.status(404);
    throw new Error('Job application not found');
  }

  Object.assign(job, req.body);
  await job.save();

  res.status(200).json({
    success: true,
    message: 'Job application updated successfully',
    data: { job },
  });
});

/**
 * @desc    Update only the status of a job application
 * @route   PATCH /api/jobs/:id/status
 * @access  Private
 */
const updateJobStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const job = await Job.findOne({ _id: req.params.id, user: req.user._id });

  if (!job) {
    res.status(404);
    throw new Error('Job application not found');
  }

  job.status = status;
  await job.save();

  res.status(200).json({
    success: true,
    message: 'Job status updated successfully',
    data: { job },
  });
});

/**
 * @desc    Delete a job application
 * @route   DELETE /api/jobs/:id
 * @access  Private
 */
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!job) {
    res.status(404);
    throw new Error('Job application not found');
  }

  res.status(200).json({
    success: true,
    message: 'Job application deleted successfully',
    data: { job },
  });
});

module.exports = { addJob, getJobs, getJobById, updateJob, updateJobStatus, deleteJob };
