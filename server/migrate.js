// ==============================================================================
// Database Migration & Seed Runner
// Executes schema.sql directly against PostgreSQL using node-pg
// Usage: npm run db:init
// ==============================================================================
const fs = require('fs');
const path = require('path');
const db = require('./src/config/db');

async function runMigration() {
  const schemaPath = path.join(__dirname, 'schema.sql');

  console.log('⏳ Reading schema.sql from:', schemaPath);
  const sql = fs.readFileSync(schemaPath, 'utf8');

  try {
    console.log('⏳ Executing PostgreSQL schema & seed script...');
    await db.query(sql);

    console.log('✅ PostgreSQL schema created and seeded successfully!');

    // Verify projects in DB
    const res = await db.query('SELECT id, title, featured FROM projects ORDER BY id ASC;');
    console.log('\n📦 Seeded Projects in Database:');
    console.table(res.rows);

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    if (error.detail) console.error('Detail:', error.detail);
    process.exit(1);
  }
}

runMigration();
