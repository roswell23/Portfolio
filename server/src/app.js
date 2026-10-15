// ==============================================================================
// Express App Definition - Roswell Cruz Portfolio API
// Configures middlewares, security, routes, and global error handling
// ==============================================================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Middlewares
const { globalLimiter } = require('./middleware/rateLimiter');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

// Route Handlers
const projectsRoute = require('./routes/projects');
const messagesRoute = require('./routes/messages');

const app = express();

// Trust reverse proxy (Required for Render, Railway, Vercel so express-rate-limit gets real client IPs)
app.set('trust proxy', 1);

// 1. Security Headers with Helmet
app.use(helmet());

// 2. Global Rate Limiter (200 requests per 15 min per IP)
app.use(globalLimiter);

// 3. CORS Configuration
const allowedOrigins = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',').map(url => url.trim()) 
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// 4. Request Body Parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Root & Health Check Endpoints
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🚀 Roswell Cruz Portfolio API is running',
    status: 'online',
    version: '1.0.0',
    database: 'PostgreSQL (Neon) via Prisma',
    endpoints: {
      health: 'GET /api/health',
      projects: 'GET /api/projects',
      messages: 'POST /api/messages'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 6. Mount API Routes
app.use('/api/projects', projectsRoute);
app.use('/api/messages', messagesRoute);

// 7. 404 & Global Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
