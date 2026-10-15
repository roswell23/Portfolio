import React from 'react';

/**
 * Reusable card component for individual skill and tool items.
 * Renders an official brand/interface icon with standardized sizing,
 * accessibility attributes, and hover-ready micro-interactions.
 */
export default function SkillCard({ name, icon: Icon }) {
  return (
    <div className="skill-card">
      <div className="skill-icon-wrapper" aria-hidden="true">
        <Icon className="skill-icon-svg" size={24} />
      </div>
      <span className="skill-title">{name}</span>
    </div>
  );
}
