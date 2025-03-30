import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { initQuickTransferDb } from '../src/lib/db/quickTransfer';
import { ensureDirectoryExists } from '../src/lib/db/index';

async function migrateData() {
  console.log('Starting migration of quickTransfer data to SQLite...');
  
  // Ensure data directory exists
  const dataDir = join(process.cwd(), 'data');
  ensureDirectoryExists(dataDir);
  
  // Read JSON data
  const jsonPath = join(process.cwd(), 'src/data/quickTransfer.json');
  const jsonData = JSON.parse(readFileSync(jsonPath, 'utf8'));
  
  // Open database connection
  const db = await initQuickTransferDb();
  
  // Drop existing tables if they exist to ensure clean migration
  await db.exec(`DROP TABLE IF EXISTS transfers`);
  await db.exec(`DROP TABLE IF EXISTS contacts`);
  
  // Recreate tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      avatar TEXT NOT NULL
    )
  `);
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS transfers (
      id INTEGER PRIMARY KEY,
      contactId INTEGER NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (contactId) REFERENCES contacts(id)
    )
  `);
  
  try {
    // Begin transaction
    await db.run('BEGIN TRANSACTION');
    
    // Insert contacts
    console.log(`Migrating ${jsonData.contacts.length} contacts...`);
    for (const contact of jsonData.contacts) {
      await db.run(
        'INSERT OR REPLACE INTO contacts (id, name, position, avatar) VALUES (?, ?, ?, ?)',
        [contact.id, contact.name, contact.position, contact.avatar]
      );
    }
    
    // Insert transfers
    console.log(`Migrating ${jsonData.transfers.length} transfers...`);
    for (const transfer of jsonData.transfers) {
      await db.run(
        'INSERT OR REPLACE INTO transfers (id, contactId, amount, date) VALUES (?, ?, ?, ?)',
        [transfer.id, transfer.contactId, transfer.amount, transfer.date]
      );
    }
    
    // Commit transaction
    await db.run('COMMIT');
    console.log('Migration completed successfully!');
    
  } catch (error) {
    // Rollback on error
    await db.run('ROLLBACK');
    console.error('Error during migration:', error);
  } finally {
    // Close database connection
    await db.close();
  }
}

migrateData().catch(console.error);
