import Database from "tauri-plugin-sql-api";

// sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
const db = await Database.load("sqlite:test.db");

export default db;