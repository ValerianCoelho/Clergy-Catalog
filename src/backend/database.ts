import Database from "tauri-plugin-sql-api";

// sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
const db = await Database.load("sqlite:test.db");

// create tables like this

db.execute("create table if not exists users (name varchar(20), age int(5));");

export default db;
