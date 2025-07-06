// ① Import built-in and third-party modules/libraries
// These are syntax built-in or require installing via npm

const express = require('express');        // Import Express framework (built-in syntax)
const bodyParser = require('body-parser'); // Middleware to parse form data (built-in syntax)
const mysql = require('mysql2');           // MySQL library to connect to your database (built-in syntax)
const path = require('path');              // Node.js built-in module for file paths

// ② Create an Express application
// This is written by YOU, using Express syntax
const app = express();

// ③ Define the port number (3000 is common for local development)
// You choose this number
const port = 3000;

//
// ④ Set up connection to MySQL database
//
const db = mysql.createConnection({
  host: 'localhost',     // Built-in syntax: hostname of your MySQL server (usually localhost)
  user: 'root',          // Your MySQL username
  password: '',          // Your MySQL password (empty if using XAMPP default)
  database: 'nodedb'     // The name of your database
});

// ⑤ Connect to the MySQL database
// Callback function: Runs after attempt to connect
db.connect(err => {
  if (err) {
    // If there's an error, print it to the console
    console.error('DB connection failed:', err.stack);
    return; // Stop here if there's a DB error
  }
  // If successful, print this
  console.log('Connected to database.');
});

//
// ⑥ Middleware Section
//

// Tells Express to use body-parser to handle form submissions
// This is built-in middleware syntax
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (like your index.html)
// This tells Express to look for files in the current directory (__dirname)
app.use(express.static(__dirname)); // Your line, using built-in syntax

//
// ⑦ Route: Handle form submissions (POST request to /submit)
//

app.post('/submit', (req, res) => {
  // Get form values from the user
  const { firstname, lastname } = req.body;

  // SQL query to insert the form data into the database
  const sql = 'INSERT INTO nodeTable (FirstName, LastName) VALUES (?, ?)';

  // Run the query with provided values
  db.query(sql, [firstname, lastname], (err, result) => {
    if (err) {
      // If something goes wrong, return an error
      console.error(err);
      res.status(500).send('Error saving to database');
    } else {
      // If everything is OK, respond with success message
      res.send('<h2>Data saved successfully</h2><a href="/">Back</a>');
    }
  });
});

//
// ⑧ Route: Send all table data as JSON (GET request to /data)
//

app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM nodeTable'; // SQL query to get all data from the table

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err); // Log any database error
      res.status(500).send('Error retrieving data');
    } else {
      res.json(results);  // Send the data as JSON to frontend
    }
  });
});

//
// ⑨ Start the server and listen on port 3000
// Built-in Express syntax, written by you
//

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
