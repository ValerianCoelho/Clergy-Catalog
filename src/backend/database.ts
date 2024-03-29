import Database from "tauri-plugin-sql-api";

// sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
const db = await Database.load("sqlite:test.db");

db.execute(`
  CREATE TABLE IF NOT EXISTS person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fname TEXT,
    lname TEXT,
    email TEXT,
    contact1 INTEGER,
    contact2 INTEGER,
    contact3 INTEGER,
    pan TEXT,
    sbn INTEGER UNIQUE,
    beneficiary1 TEXT,
    beneficiary2 TEXT,
    address TEXT,
    isDeleted TEXT
  );
`);

db.execute(`
  CREATE TABLE IF NOT EXISTS donation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sbn INTEGER,
    purpose TEXT,
    amount REAL,
    paymentMode TEXT,
    date TEXT,
    receipt TEXT
  );
`);

export default db;
