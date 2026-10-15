import React from 'react';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-card">
          {/* Left Column: Real Portrait Photo with Golden Frame */}
          <div className="about-photo-wrapper">
            <div className="about-photo-frame">
              <img
                src="/images/profile/roswell-cruz.png"
                alt="Roswell Cruz - Frontend & Full-Stack Developer from Cavite, Philippines"
                className="about-photo-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/roswell-profile.png';
                }}
              />
            </div>
          </div>

          {/* Right Column: Bio & Stat Cards */}
          <div className="about-content">
            <h2 id="about-heading" className="about-title-inner">About Me</h2>

            <p className="about-paragraph">
              Hello! I'm <strong>Roswell Cruz</strong>, a passionate tech enthusiast from Cavite, Philippines. Currently pursuing my studies at Cavite State University-Tanza, I'm dedicated to becoming a skilled Frontend & Full-Stack Developer.
            </p>

            <p className="about-paragraph">
              I love creating beautiful and functional web experiences that make a difference. My goal is to combine technical expertise with creative design to build engaging digital solutions.
            </p>

            {/* Stat Cards (4+ Projects Built, 100% Dedication) */}
            <div className="about-stats-grid">
              <div className="about-stat-card">
                <div className="stat-value">4+</div>
                <div className="stat-label">Projects Built</div>
              </div>

              <div className="about-stat-card">
                <div className="stat-value">100%</div>
                <div className="stat-label">Dedication</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
