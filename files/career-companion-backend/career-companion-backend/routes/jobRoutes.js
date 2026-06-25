const express = require('express');
const {
  addJob,
  getJobs,
  getJobById,
  updateJob,
  updateJobStatus,
  deleteJob,
} = require('../controllers/jobController');
const {
  createJobValidator,
  updateJobValidator,
  updateJobStatusValidator,
} = require('../middleware/validators/jobValidator');
const validateRequest = require('../middleware/validateRequest');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All job routes require authentication
router.use(protect);

// @route   POST /api/jobs        - Add a job application
// @route   GET  /api/jobs        - Get all job applications (supports ?status & pagination)
router
  .route('/')
  .post(createJobValidator, validateRequest, addJob)
  .get(getJobs);

// @route   GET    /api/jobs/:id   - Get single job
// @route   PUT    /api/jobs/:id   - Update job fields
// @route   DELETE /api/jobs/:id   - Delete job
router
  .route('/:id')
  .get(getJobById)
  .put(updateJobValidator, validateRequest, updateJob)
  .delete(deleteJob);

// @route   PATCH /api/jobs/:id/status - Update only the job status
router.patch('/:id/status', updateJobStatusValidator, validateRequest, updateJobStatus);

module.exports = router;
