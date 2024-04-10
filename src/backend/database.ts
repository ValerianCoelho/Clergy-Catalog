import Database from "tauri-plugin-sql-api";
import { BaseDirectory, readTextFile, writeTextFile } from "@tauri-apps/api/fs";

// sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
let db;
let db_name;
try {
  try {
    db_name = await readTextFile("active.txt", {
      dir: BaseDirectory.AppConfig,
    });
  } catch (error) {
    db_name = "database 1";
    await writeTextFile("active.txt", db_name, {
      dir: BaseDirectory.AppConfig,
    });
  }
  db = await Database.load(`sqlite:${db_name}.db`);
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
} catch (error) {
  console.error(error);
}

export default db;
