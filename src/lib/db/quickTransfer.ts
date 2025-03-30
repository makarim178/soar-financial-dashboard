import { openDb } from './index';

// Initialize the quickTransfer database
export async function initQuickTransferDb() {
  const db = await openDb('quickTransfer');
  
  // Create contacts table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      avatar TEXT NOT NULL
    )
  `);
  
  // Create transfers table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS transfers (
      id INTEGER PRIMARY KEY,
      contactId INTEGER NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (contactId) REFERENCES contacts(id)
    )
  `);
  
  return db;
}

// Contact-related queries
export async function getContacts(limit: number, offset: number) {
  const db = await initQuickTransferDb();
  
  const countResult = await db.get('SELECT COUNT(*) as total FROM contacts');
  const total = countResult.total;
  
  const contacts = await db.all(
    'SELECT * FROM contacts LIMIT ? OFFSET ?',
    [limit, offset]
  );
  
  const hasMore = offset + limit < total;
  
  return { contacts, hasMore, total };
}

export async function getContactById(id: number) {
  const db = await initQuickTransferDb();
  return db.get('SELECT * FROM contacts WHERE id = ?', [id]);
}

// Transfer-related queries
export async function createTransfer(contactId: number, amount: number) {
  const db = await initQuickTransferDb();
  
  const date = new Date().toISOString();
  const id = Date.now(); // Use timestamp as ID
  
  const result = await db.run(
    'INSERT INTO transfers (id, contactId, amount, date) VALUES (?, ?, ?, ?)',
    [id, contactId, amount, date]
  );
  
  return result;
}

export async function getTransfersByContactId(contactId: number) {
  const db = await initQuickTransferDb();
  return db.all('SELECT * FROM transfers WHERE contactId = ? ORDER BY date DESC', [contactId]);
}