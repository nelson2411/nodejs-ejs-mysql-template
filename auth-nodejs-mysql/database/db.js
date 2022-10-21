// In this file we create a connection to our mysql database and export it
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Check if the connection is successful

connection.connect((error) => {
  if (error) {
    console.error(`The error is: ${error}`);
    return;
  }
  console.log("📚 Database server running");
});

// Export the connection

module.exports = connection;
