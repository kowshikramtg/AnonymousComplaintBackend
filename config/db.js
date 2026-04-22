import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const connectDB = async () => {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
        CREATE TABLE IF NOT EXISTS issues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        pincode TEXT,
        category TEXT,
        priority TEXT,
        status TEXT,
        createdAt TEXT
        )
    `);
  return db;
};
