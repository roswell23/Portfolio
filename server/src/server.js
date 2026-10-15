// ==============================================================================
// Server Entry Point - Roswell Cruz Portfolio API
// Initializes database connection and starts HTTP listener
// ==============================================================================
const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = require('./app');
const prisma = require('./config/db');

const PORT = process.env.PORT || 5000;

// Test Prisma database connection
prisma.$connect()
  .then(() => console.log('✅ Successfully connected to PostgreSQL database via Prisma'))
  .catch(err => console.error('❌ Error connecting to PostgreSQL via Prisma:', err.message));

// Start Express Listener
const server = app.listen(PORT, () => {
  console.log(`🚀 Portfolio Server running at http://localhost:${PORT}`);
});

// Graceful Shutdown handling
function handleShutdown(signal) {
  console.log(`\n⏳ Received ${signal}. Gracefully shutting down...`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log('✅ Prisma client disconnected.');
    } catch (err) {
      console.error('❌ Error disconnecting Prisma:', err.message);
    }
    process.exit(0);
  });
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

module.exports = server;
