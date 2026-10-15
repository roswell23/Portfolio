// ==============================================================================
// Centralized API Service for Roswell Cruz Portfolio
// Handles communication with the Express/PostgreSQL backend with fallback support
// ==============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fallback static projects used if the PostgreSQL server is not yet running or offline.
 * This guarantees the portfolio frontend always demonstrates its full UI cleanly.
 * Tech stacks verified from actual GitHub repository source code and README files.
 */
export const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'TodoFlow — Task Orchestration & RBAC Platform',
    description:
      'A full-stack task management platform focused on secure authentication, task organization, and role-based access control. Designed to support productivity workflows, protected application routes, and administrative user management.',
    image_url: '/images/projects/TodoFlow.jpg',
    tech_stack: ['React', 'Express.js', 'Prisma', 'PostgreSQL / Neon', 'JWT', 'Vite', 'Vanilla CSS'],
    live_url: 'https://usetodoflow.netlify.app',
    github_url: 'https://github.com/roswell23/TodoFlow',
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Kapeniross Coffee',
    description:
      'A React-based artisan coffee shop web app featuring a dark glassmorphic interface, interactive shopping cart with real-time subtotal calculations, product quick-view modals, global menu search, and toast notifications.',
    image_url: '/images/projects/Kapenirossv2.jpg',
    tech_stack: ['React', 'Vite', 'Lucide React', 'Vanilla CSS'],
    live_url: 'https://kapenirossv2.netlify.app',
    github_url: 'https://github.com/roswell23/Kapenirossv2',
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Genesis Prototype',
    description:
      'An exploratory frontend prototyping sandbox for experimenting with reusable React components, responsive layouts, interactive interfaces, and modern state management patterns.',
    image_url: '/images/projects/genesis_thumbnail.png',
    tech_stack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    live_url: null,
    github_url: 'https://github.com/roswell23',
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    title: 'RC Portfolio',
    description:
      'A high-performance, full-stack personal developer portfolio built with the PERN stack (PostgreSQL, Express, React, Node.js), Prisma ORM, and Vite. Features a refined dark glassmorphic design system with golden amber accents, interactive project showcases, a secure contact form API with Brevo email notifications, and graceful backend-offline fallback support.',
    image_url: '/images/projects/portfolio-preview.png',
    tech_stack: ['React', 'Express.js', 'Prisma', 'PostgreSQL / Neon', 'Vite', 'Vanilla CSS', 'Brevo API'],
    live_url: 'https://roswellcruz.dev',
    github_url: 'https://github.com/roswell23',
    featured: false,
    created_at: new Date().toISOString()
  }
];

/**
 * Fetch all projects from the backend API
 * @returns {Promise<{projects: Array, isFallback: boolean}>}
 */
export async function getProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Server responded with HTTP status ${response.status}`);
    }

    const json = await response.json();
    return {
      projects: json.data || [],
      isFallback: false
    };
  } catch (error) {
    console.warn('Backend API unavailable. Utilizing fallback projects dataset:', error.message);
    return {
      projects: FALLBACK_PROJECTS,
      isFallback: true,
      error: error.message
    };
  }
}

/**
 * Send a contact message to the backend API
 * @param {{name: string, email: string, message: string}} messageData
 * @returns {Promise<{success: boolean, message: string, errors?: object}>}
 */
export async function sendMessage(messageData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(messageData)
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to submit contact message',
        errors: data.errors || {}
      };
    }

    return {
      success: true,
      message: data.message || 'Message sent successfully!'
    };
  } catch (error) {
    console.error('Network error during sendMessage:', error);
    return {
      success: false,
      message: 'Network error: could not connect to server. Please check your connection or send an email directly.'
    };
  }
}
