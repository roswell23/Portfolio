import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { getProjects } from '../services/api';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        const result = await getProjects();
        if (isMounted) {
          setProjects(result.projects || []);
          setIsFallback(result.isFallback);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error in loadProjects:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // TodoFlow is the primary featured case study
  const featuredProject =
    projects.find(p => p.title?.toLowerCase().includes('todo') || p.featured) || projects[0];

  // Supporting projects: Kapeniross Coffee and Genesis Prototype
  const supportingProjects = projects.filter(
    p => p.id !== featuredProject?.id && !p.title?.toLowerCase().includes('todo')
  );

  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-heading">
      <div className="container">

        {/* 2. Projects Section Header */}
        <div className="section-header projects-section-header">
          <span className="projects-eyebrow">PROJECTS</span>
          <h2 id="projects-heading" className="section-title projects-title">
            Featured <span className="text-gold">Projects</span>
          </h2>
          <p className="section-description projects-description">
            Production-ready applications built with modern React, clean architecture, and thoughtful UX —
            from full-stack platforms to polished frontend experiences.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="projects-skeleton-wrapper" aria-label="Loading projects...">
            <div className="skeleton skeleton-banner" aria-hidden="true" />
            <div className="projects-grid">
              <div className="skeleton skeleton-card" aria-hidden="true" />
              <div className="skeleton skeleton-card" aria-hidden="true" />
            </div>
          </div>
        )}

        {/* 3. Featured Project: TodoFlow */}
        {!loading && featuredProject && (
          <article
            className="featured-case-study"
            aria-label="Featured case study: TodoFlow — Task Orchestration & RBAC Platform"
          >
            {/* Split Container: Left Info & Right Dashboard Screenshot */}
            <div className="featured-case-study-top">
              {/* Left Column: Information, Badges & Actions */}
              <div className="featured-info-col">
                <div className="featured-badge-row">
                  <span className="featured-badge">
                    <span className="featured-badge-dot" aria-hidden="true" />
                    Featured Full-Stack Case Study
                  </span>
                </div>

                <h3 className="featured-project-heading">
                  TodoFlow <span className="featured-heading-sep">—</span>{' '}
                  <span className="featured-heading-sub">Task Orchestration & RBAC Platform</span>
                </h3>

                <p className="featured-project-desc">
                  A full-stack task management platform focused on secure authentication, task organization,
                  and role-based access control. Designed to support productivity workflows, protected
                  application routes, and administrative user management.
                </p>

                {/* Confirmed Technologies Verified from Source Code */}
                <div
                  className="project-stack featured-tech-stack"
                  aria-label="Technologies used in TodoFlow"
                >
                  {[
                    'React',
                    'Express.js',
                    'Prisma',
                    'PostgreSQL / Neon',
                    'JWT',
                    'Vite',
                    'Vanilla CSS'
                  ].map((tech, idx) => (
                    <span key={idx} className="project-stack-tag featured-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Two Clear Action Buttons */}
                <div className="featured-actions" role="group" aria-label="TodoFlow actions">
                  <a
                    href={featuredProject.live_url || featuredProject.liveUrl || 'https://usetodoflow.netlify.app'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-featured-primary"
                    id="featured-live-demo-btn"
                    aria-label="Open live demo of TodoFlow in a new tab"
                  >
                    <span>Live Demo</span>
                    <FiExternalLink size={16} aria-hidden="true" />
                  </a>

                  <a
                    href={featuredProject.github_url || featuredProject.githubUrl || 'https://github.com/roswell23/TodoFlow'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-featured-secondary"
                    id="featured-github-btn"
                    aria-label="Open GitHub repository for TodoFlow in a new tab"
                  >
                    <span>GitHub Repository</span>
                    <FiGithub size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right Column: Actual TodoFlow Dashboard Screenshot */}
              <div className="featured-preview-col">
                <div className="featured-browser-frame">
                  <div className="browser-chrome-bar" aria-hidden="true">
                    <div className="browser-dots">
                      <span className="browser-dot dot-red" />
                      <span className="browser-dot dot-yellow" />
                      <span className="browser-dot dot-green" />
                    </div>
                    <div className="browser-address-bar">
                      <span className="address-lock">🔒</span>
                      <span className="address-url">usetodoflow.netlify.app</span>
                    </div>
                    <div className="browser-status-tag">Live</div>
                  </div>
                  <div className="browser-viewport">
                    <img
                      src={featuredProject.image_url || featuredProject.imageUrl || '/images/projects/portfolio-preview.png'}
                      alt="TodoFlow workspace dashboard interface showing task board, priority indicators, and completion metrics"
                      className="featured-dashboard-img"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Four Compact Case Study Information Panels */}
            <div className="case-study-grid" aria-label="TodoFlow case study details">
              <div className="case-study-block">
                <div className="case-study-block-header">
                  <span className="case-study-block-num">01</span>
                  <span className="case-study-block-sep">/</span>
                  <h4 className="case-study-block-title">The Problem</h4>
                </div>
                <p>
                  Workflow efficiency suffers when daily tasks are scattered across disjointed tools
                  without centralized priority organization, clear status transitions, or role-based
                  boundaries between regular members and system administrators.
                </p>
              </div>

              <div className="case-study-block">
                <div className="case-study-block-header">
                  <span className="case-study-block-num">02</span>
                  <span className="case-study-block-sep">/</span>
                  <h4 className="case-study-block-title">My Role</h4>
                </div>
                <p>
                  Full-Stack Developer & UI Designer. Designed the modular React component
                  architecture and responsive dark interface, engineered the Express REST API
                  endpoints, defined Prisma schemas with Neon PostgreSQL, and implemented JWT
                  authentication and role-based route protection.
                </p>
              </div>

              <div className="case-study-block">
                <div className="case-study-block-header">
                  <span className="case-study-block-num">03</span>
                  <span className="case-study-block-sep">/</span>
                  <h4 className="case-study-block-title">Technical Decisions</h4>
                </div>
                <p>
                  Architected a decoupled React and Express structure with secure JWT bearer
                  authentication, structured Prisma models with PostgreSQL on Neon, enforced
                  route-level RBAC middleware for administrative features, and built a lightweight
                  zero-framework Vanilla CSS design system.
                </p>
              </div>

              <div className="case-study-block">
                <div className="case-study-block-header">
                  <span className="case-study-block-num">04</span>
                  <span className="case-study-block-sep">/</span>
                  <h4 className="case-study-block-title">Project Outcome</h4>
                </div>
                <p>
                  Delivered a responsive task management platform featuring persistent state, seamless
                  task CRUD workflows, secure role-protected routing, and an intuitive administrative
                  interface with zero bloated dependencies.
                </p>
              </div>
            </div>
          </article>
        )}

        {/* 4. More Projects Section */}
        {!loading && supportingProjects.length > 0 && (
          <div className="more-projects-section" aria-labelledby="more-projects-title">
            <div className="more-projects-header">
              <h3 id="more-projects-title" className="more-projects-heading">
                More Projects
              </h3>
              <div className="more-projects-divider" aria-hidden="true" />
            </div>

            <div className="projects-grid supporting-projects-grid">
              {supportingProjects.map(proj => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>
          </div>
        )}

        {/* Offline fallback notice */}
        {isFallback && !loading && (
          <p className="projects-fallback-notice" role="status" aria-live="polite">
            ℹ️ Displaying cached project data — backend server is offline.
          </p>
        )}
      </div>
    </section>
  );
}
