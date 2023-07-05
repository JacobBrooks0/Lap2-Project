require('dotenv').config();
const fs = require("fs");
const path = require('path');
const { Pool } = require('pg');


const setupMockDB = async () => {
  const db = new Pool({
    connectionString: process.env.DB_URL
  })

  const sql = fs.readFileSync(path.join(__dirname, "../../database/setup.sql")).toString();

  try {
    await db.query(sql)
    db.end();
    console.log("Database Setup Complete 👍");
  } catch (error) {
    console.log(error)
  }
}

module.exports = setupMockDB;
