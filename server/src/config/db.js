// ==============================================================================
// Database Configuration & Connection Module
// Roswell Cruz Portfolio - PostgreSQL (Neon) via Prisma Client & pg Pool
// ==============================================================================
const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');

// 1. Initialize Prisma Client Singleton
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

// 2. Direct PostgreSQL Connection Pool (Used for raw queries / migrations)
const connectionString = process.env.DATABASE_URL;
let poolConfig;

if (connectionString) {
  poolConfig = {
    connectionString,
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
  };
} else {
  poolConfig = {
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT, 10) || 5432,
    database: process.env.PGDATABASE || 'portfolio_db'
  };
}

const pool = new Pool(poolConfig);

// Attach pool and query helpers onto prisma for flexible imports
prisma.pool = pool;
prisma.query = (text, params) => pool.query(text, params);
prisma.prisma = prisma;

module.exports = prisma;
