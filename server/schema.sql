-- ==============================================================================
-- POSTGRESQL SCHEMA & SEED DATA
-- Application: Roswell Cruz Developer Portfolio (PERN Stack)
-- Compatible with: Local PostgreSQL (v14+), Neon, Supabase, Render, Railway
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 0. CLEANUP (Optional - uncomment if you want a complete reset)
-- ------------------------------------------------------------------------------
-- DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
-- DROP FUNCTION IF EXISTS update_updated_at_column();
-- DROP TABLE IF EXISTS messages CASCADE;
-- DROP TABLE IF EXISTS projects CASCADE;

-- ------------------------------------------------------------------------------
-- 1. UTILITY: AUTO-UPDATE TIMESTAMP TRIGGER FUNCTION
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 2. PROJECTS TABLE
-- Stores portfolio showcase projects with case study details and tech tags
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    live_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Data integrity checks
    CONSTRAINT chk_projects_title_length CHECK (char_length(trim(title)) >= 2),
    CONSTRAINT chk_projects_desc_length CHECK (char_length(trim(description)) >= 10)
);

-- Trigger to keep updated_at current
DROP TRIGGER IF EXISTS trigger_update_projects_updated_at ON projects;
CREATE TRIGGER trigger_update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_featured_created 
ON projects (featured DESC, created_at DESC);

-- Column documentation
COMMENT ON TABLE projects IS 'Portfolio projects featured on the website';
COMMENT ON COLUMN projects.tech_stack IS 'Array of technologies utilized (e.g. {React, Node.js, PostgreSQL})';
COMMENT ON COLUMN projects.featured IS 'Indicates hero case study status (true for Kapeniulit)';

-- ------------------------------------------------------------------------------
-- 3. MESSAGES TABLE
-- Stores inbound messages submitted through the website contact form
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Data integrity checks
    CONSTRAINT chk_messages_name_not_empty CHECK (char_length(trim(name)) > 0),
    CONSTRAINT chk_messages_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_messages_message_length CHECK (char_length(trim(message)) >= 5)
);

-- Index for ordering messages by date in admin queries
CREATE INDEX IF NOT EXISTS idx_messages_created_at 
ON messages (created_at DESC);

-- Column documentation
COMMENT ON TABLE messages IS 'Contact inquiries submitted by visitors';

-- ------------------------------------------------------------------------------
-- 4. SEED DATA (Default projects)
-- ------------------------------------------------------------------------------
-- Clear existing projects before inserting seeds to prevent duplicates on re-runs
TRUNCATE TABLE projects RESTART IDENTITY CASCADE;

INSERT INTO projects (title, description, image_url, tech_stack, live_url, github_url, featured)
VALUES
(
    'TodoFlow',
    'A production-grade full-stack task management platform with JWT authentication, live productivity analytics, strict tenant-scoped data isolation, and an enterprise Admin Command Center featuring Role-Based Access Control (RBAC) for user lifecycle governance and global task moderation.',
    '/images/projects/TodoFlow.jpg',
    ARRAY['React 19', 'Express 5', 'Prisma 7', 'Neon PostgreSQL', 'JWT', 'Vite 8', 'Vanilla CSS'],
    'https://usetodoflow.netlify.app',
    'https://github.com/roswell23/TodoFlow',
    TRUE
),
(
    'Kapeniross Coffee',
    'A React-based artisan coffee shop web app with a dark glassmorphic UI, interactive cart drawer with real-time subtotaling, quick-view product modals, instant global menu search, and non-blocking toast notification feedback.',
    '/images/projects/Kapenirossv2.jpg',
    ARRAY['React 19', 'Vite 8', 'Lucide React', 'Vanilla CSS', 'oxlint'],
    'https://kapenirossv2.netlify.app',
    'https://github.com/roswell23/Kapenirossv2',
    FALSE
),
(
    'Genesis Prototype',
    'An exploratory frontend prototyping sandbox for rapid UI experimentation, reusable component architecture, responsive layout patterns, and modern React state management workflows.',
    '/images/projects/genesis_thumbnail.png',
    ARRAY['React', 'JavaScript (ES6+)', 'CSS3', 'HTML5'],
    NULL,
    'https://github.com/roswell23',
    FALSE
),
(
    'RC Portfolio',
    'A high-performance, full-stack personal developer portfolio built with the PERN stack (PostgreSQL, Express, React, Node.js), Prisma ORM, and Vite. Features a refined dark glassmorphic design system with golden amber accents, interactive project showcases, a secure contact form API with Brevo email notifications, and graceful backend-offline fallback support.',
    '/images/projects/portfolio-preview.png',
    ARRAY['React', 'Express.js', 'Prisma', 'PostgreSQL / Neon', 'Vite', 'Vanilla CSS', 'Brevo API'],
    'https://roswellcruz.dev',
    'https://github.com/roswell23',
    FALSE
);

-- ------------------------------------------------------------------------------
-- 5. VERIFICATION
-- ------------------------------------------------------------------------------
SELECT id, title, featured, tech_stack, created_at FROM projects;
