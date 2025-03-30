import { openDb } from './index';

// Initialize the users database
export async function initUsersDb() {
  const db = await openDb('users');
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      userName TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      dob TEXT NOT NULL,
      presentAddress TEXT NOT NULL,
      permanentAddress TEXT,
      city TEXT NOT NULL,
      postalCode TEXT NOT NULL,
      country TEXT NOT NULL,
      profileImage TEXT,
      createdAt TEXT NOT NULL
    )
  `);
  return db;
}

// User-related queries
export async function createUser(userData: any) {
  const db = await initUsersDb();
  
  const result = await db.run(
    `INSERT INTO users (
      name, userName, email, password, dob, presentAddress, 
      permanentAddress, city, postalCode, country, profileImage, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userData.name, 
      userData.userName, 
      userData.email, 
      userData.password, 
      userData.dob, 
      userData.presentAddress,
      userData.permanentAddress, 
      userData.city, 
      userData.postalCode, 
      userData.country, 
      userData.profileImage,
      userData.createdAt || new Date().toISOString()
    ]
  );
  
  return result;
}

export async function getUserByEmail(email: string) {
  const db = await initUsersDb();
  return db.get('SELECT * FROM users WHERE email = ?', [email]);
}

export async function getUserByUsername(username: string) {
  const db = await initUsersDb();
  return db.get('SELECT * FROM users WHERE userName = ?', [username]);
}