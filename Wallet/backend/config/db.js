import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// creates a sql connection with the database url from .env file
const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      category VARCHAR(50) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    console.log("Database initialized and 'transactions' table created.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // status code 1 indicates failure 0 means success
  }
}

export default sql;
