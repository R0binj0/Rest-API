const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'name',
  password: 'password',
  database: 'database-name'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Serve the static files in the "public" directory
app.use(express.static('public'));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a POST endpoint to handle name submissions
app.post('/names', (req, res) => {
  const name = req.body.name; // Assuming the input field name is "name"

  // Insert the name into the database
  const query = 'INSERT INTO names (name) VALUES (?)';
  connection.query(query, [name], (err, result) => {
    if (err) {
      console.error('Error inserting name:', err);
      res.status(500).send('Error inserting name');
      return;
    }

    console.log('Name inserted:', name);
    res.sendStatus(200);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
