import React from 'react';
import { FiExternalLink, FiGithub, FiCoffee, FiLayers, FiCode, FiClock } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  const {
    title,
    description,
    image_url,
    imageUrl,
    tech_stack = [],
    techStack = [],
    live_url,
    liveUrl,
    github_url,
    githubUrl
  } = project;

  const resolvedImage = image_url || imageUrl || '/images/projects/portfolio-preview.png';
  const resolvedTech = tech_stack.length > 0 ? tech_stack : techStack;
  const resolvedLive = live_url || liveUrl;
  const resolvedGithub = github_url || githubUrl;

  // Select technology / theme-appropriate icon for the project title
  const getProjectIcon = (projectTitle = '') => {
    const lower = projectTitle.toLowerCase();
    if (lower.includes('coffee') || lower.includes('kapeniross')) {
      return <FiCoffee size={16} aria-hidden="true" />;
    }
    if (lower.includes('genesis') || lower.includes('prototype')) {
      return <FiLayers size={16} aria-hidden="true" />;
    }
    return <FiCode size={16} aria-hidden="true" />;
  };

  return (
    <article className="project-card" aria-label={`Project: ${title}`}>
      {/* Project Screenshot with consistent aspect ratio */}
      <div className="project-thumbnail-wrapper">
        <img
          src={resolvedImage}
          alt={`Screenshot preview of ${title}`}
          className="project-thumbnail"
          loading="lazy"
        />
        <div className="project-thumbnail-overlay" aria-hidden="true" />
      </div>

      {/* Card Content */}
      <div className="project-body">
        <div className="project-header-row">
          <h3 className="project-title">
            <span className="project-title-icon-wrap" aria-hidden="true">
              {getProjectIcon(title)}
            </span>
            <span>{title}</span>
          </h3>
        </div>

        <p className="project-desc">{description}</p>

        {/* Technology Badges */}
        {resolvedTech && resolvedTech.length > 0 && (
          <div className="project-stack" aria-label={`Technologies used in ${title}`}>
            {resolvedTech.map((tech, idx) => (
              <span key={idx} className="project-stack-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Subtle divider separating content from actions */}
        <div className="project-card-divider" role="separator" />

        {/* Action Links Aligned Consistently at Bottom */}
        <div className="project-links" role="group" aria-label={`Actions for ${title}`}>
          {resolvedLive ? (
            <a
              href={resolvedLive}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link project-link-primary"
              aria-label={`View live demo of ${title} (opens in new tab)`}
            >
              <span>Live Demo</span>
              <FiExternalLink size={15} aria-hidden="true" />
            </a>
          ) : (
            <span
              className="project-link-badge"
              title="Exploratory UI sandbox — local prototype"
              aria-label="Component Sandbox Prototype"
            >
              <FiClock size={14} aria-hidden="true" />
              <span>Prototype</span>
            </span>
          )}

          {resolvedGithub && (
            <a
              href={resolvedGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link project-link-secondary"
              aria-label={`View source code repository for ${title} (opens in new tab)`}
            >
              <span>Source Code</span>
              <FiGithub size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
