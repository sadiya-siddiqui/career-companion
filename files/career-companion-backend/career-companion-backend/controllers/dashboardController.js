const mongoose = require('mongoose');
const Job = require('../models/Job');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get aggregated job application analytics for the authenticated user
 *          Returns total applications, and counts broken down by status
 *          (including convenience fields for interviews, rejected, selected).
 * @route   GET /api/dashboard
 * @access  Private
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [statusBreakdown, total] = await Promise.all([
    Job.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Job.countDocuments({ user: userId }),
  ]);

  // Initialize all known statuses at 0 so the response shape is always consistent
  const counts = {
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Selected: 0,
    Rejected: 0,
    Withdrawn: 0,
  };

  statusBreakdown.forEach((entry) => {
    counts[entry._id] = entry.count;
  });

  // Recent activity: last 5 job applications
  const recentJobs = await Job.find({ user: userId })
    .sort('-createdAt')
    .limit(5)
    .select('companyName jobTitle status appliedDate createdAt');

  res.status(200).json({
    success: true,
    data: {
      totalApplications: total,
      interviews: counts.Interview,
      offers: counts.Offer,
      selected: counts.Selected,
      rejected: counts.Rejected,
      withdrawn: counts.Withdrawn,
      applied: counts.Applied,
      statusBreakdown: counts,
      recentJobs,
    },
  });
});

module.exports = { getDashboardStats };
