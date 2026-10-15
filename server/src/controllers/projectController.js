// ==============================================================================
// Project Controller
// Handles database operations and business logic for portfolio projects
// ==============================================================================
const prisma = require('../config/db');

/**
 * @desc    Get all portfolio projects (prioritizing featured projects)
 * @route   GET /api/projects
 * @access  Public
 */
async function getProjects(req, res, next) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    // Provide backward-compatible snake_case properties alongside camelCase
    const formatted = projects.map(p => ({
      ...p,
      image_url: p.imageUrl,
      tech_stack: p.techStack,
      live_url: p.liveUrl,
      github_url: p.githubUrl,
      created_at: p.createdAt,
      updated_at: p.updatedAt
    }));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (error) {
    console.error('Error fetching projects in projectController:', error.message);
    next(error);
  }
}

module.exports = {
  getProjects
};
