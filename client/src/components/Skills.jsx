import React from 'react';
import SkillCard from './SkillCard';

// Category heading icons from lucide-react
import { Code2, Workflow, Network, Terminal, MonitorSmartphone } from 'lucide-react';

// Tech Stack icons from react-icons/si
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPostgresql
} from 'react-icons/si';

// Tools & Workflow icons from react-icons
import { SiGit, SiGithub, SiFigma } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

// Category A: Tech Stack (Languages, Frameworks, Backend & Databases)
const TECH_STACK = [
  { name: 'HTML5', icon: SiHtml5 },
  { name: 'CSS3', icon: SiCss },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express.js', icon: SiExpress },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'REST APIs', icon: Network }
];

// Category B: Tools & Workflow (Development tools, version control, and design)
const TOOLS_WORKFLOW = [
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'VS Code', icon: VscVscode },
  { name: 'Figma', icon: SiFigma },
  { name: 'Terminal', icon: Terminal },
  { name: 'Responsive Design', icon: MonitorSmartphone }
];

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="container">
        {/* Main Section Header */}
        <div className="section-header">
          <span className="section-tag">Capabilities & Stack</span>
          <h2 id="skills-heading" className="section-title">Skills & Technologies</h2>
          <p className="section-description">
            A focused breakdown of the technologies and workflow tools I actively use to engineer clean, responsive, and maintainable web applications.
          </p>
        </div>

        {/* Category A: Tech Stack */}
        <div className="skills-category-group">
          <div className="skills-category-header">
            <div className="category-title-wrap">
              <span className="category-icon-badge" aria-hidden="true">
                <Code2 size={18} />
              </span>
              <h3 className="skills-category-title">Tech Stack</h3>
            </div>
            <p className="skills-category-description">
              Core frontend and backend technologies I build with daily, from responsive UIs to RESTful API endpoints and normalized relational schemas.
            </p>
          </div>

          <div className="skills-grid tech-stack-grid" role="list" aria-label="Tech Stack Skills">
            {TECH_STACK.map((skill) => (
              <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>

        {/* Category B: Tools & Workflow */}
        <div className="skills-category-group tools-category-group">
          <div className="skills-category-header">
            <div className="category-title-wrap">
              <span className="category-icon-badge" aria-hidden="true">
                <Workflow size={18} />
              </span>
              <h3 className="skills-category-title">Tools & Workflow</h3>
            </div>
            <p className="skills-category-description">
              Daily engineering environments, version control systems, interface prototyping tools, and cross-device testing practices.
            </p>
          </div>

          <div className="skills-grid tools-workflow-grid" role="list" aria-label="Tools and Workflow">
            {TOOLS_WORKFLOW.map((skill) => (
              <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

