const express = require("express");
const bodyParser = require("body-parser");
const Pool = require('pg').Pool;
const app = express();



app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '296502',
  port: 5432,
})

const client = new Pool({
    user: 'postgres',
    host: 'ip-172-31-12-126.us-east-2.compute.internal',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
    ssl: true,

})

// Middleware
app.use(bodyParser.json());

// Route to create tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tickets');
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tickets', async (req, res) => {
  try {
    const { rows } = await client.query('SELECT * FROM tickets');
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/tickets', async (req, res) => {
  const { subject, status, assigned_to } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO tickets (subject, status, assigned_to) VALUES ($1, $2, $3) RETURNING *', [subject, status, assigned_to]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/tickets', async (req, res) => {
  const { subject, status, assigned_to } = req.body;
  try {
    const { rows } = await client.query('INSERT INTO tickets (subject, status, assigned_to) VALUES ($1, $2, $3) RETURNING *', [subject, status, assigned_to]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get("/api/users", (req, res) => {
   
   pool.query('SELECT * FROM users', (error, results) => {
       
      if (error) throw error
       
       res.status(200).json(results.rows)
   })
});

app.get("/api/users", (req, res) => {
   
  client.query('SELECT * FROM users', (error, results) => {
      
     if (error) throw error
      
      res.status(200).json(results.rows)
  })
});


app.post("/api/users/create", (req, res) => {
   
   const email = req.body.email;
   const username = req.body.username; 
   const password = req.body.password;

   const sql = "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)";
   
   pool.query(sql, [email, username, password], (error, results) => {
      
   res.status(200).send("User account created successfully");
 
   })
});

app.post("/api/users/create", (req, res) => {
   
  const email = req.body.email;
  const username = req.body.username; 
  const password = req.body.password;

  const sql = "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)";
  
  client.query(sql, [email, username, password], (error, results) => {
     
  res.status(200).send("User account created successfully");

  })
});

// Endpoint to retrieve a single ticket by ID
app.get('/api/tickets/:id', (req, res) => {
  const ticketId = parseInt(req.params.id);
  pool.query('SELECT * FROM tickets WHERE id = $1', [ticketId], (error, results) => {
      if (error) {
          // Handle database query error
          console.error(error);
          res.status(500).send('Internal Server Error');
          return;
      }
      if (results.rows.length > 0) {
          const ticket = results.rows[0];
          res.json(ticket);
      } else {
          res.status(404).send('Ticket not found');
      }
  });
});

app.get('/api/tickets/:id', (req, res) => {
  const ticketId = parseInt(req.params.id);
  client.query('SELECT * FROM tickets WHERE id = $1', [ticketId], (error, results) => {
      if (error) {
          // Handle database query error
          console.error(error);
          res.status(500).send('Internal Server Error');
          return;
      }
      if (results.rows.length > 0) {
          const ticket = results.rows[0];
          res.json(ticket);
      } else {
          res.status(404).send('Ticket not found');
      }
  });
});

// Endpoint to retrieve all tickets
app.get('/api/tickets', (req, res) => {
  pool.query('SELECT * FROM tickets ORDER BY id ASC', (error, results) => {
      if (error) {
          // Handle database query error
          console.error(error);
          res.status(500).send('Internal Server Error');
          return;
      }
      res.status(200).json(results.rows);
  });
});
app.post("/api/tickets/create", (req, res) => {
   
   const subject = req.body.subject;
   const status = "Open";
   const assigned_to = "Level 1";
   const name = req.body.name;
   const email2 = req.body.email2;
   const phonenumber = req.body.phonenumber;
   const tixmessage = req.body.tixmessage;
   
    
   const sql = "INSERT INTO tickets (subject, status, assigned_to, name, email2, phonenumber, tixmessage) VALUES ($1, $2, $3, $4, $5, $6, $7)"; 
   
   pool.query(sql, [subject, status, assigned_to, name, email2, phonenumber, tixmessage], (error, results) => {
      
   res.status(200).send("Ticket submitted successfully");
 
   })
});

app.get('/api/tickets', (req, res) => {
  client.query('SELECT * FROM tickets ORDER BY id ASC', (error, results) => {
      if (error) {
          // Handle database query error
          console.error(error);
          res.status(500).send('Internal Server Error');
          return;
      }
      res.status(200).json(results.rows);
  });
});
app.post("/api/tickets/create", (req, res) => {
   
   const subject = req.body.subject;
   const status = "Open";
   const assigned_to = "Level 1";
   const name = req.body.name;
   const email2 = req.body.email2;
   const phonenumber = req.body.phonenumber;
   const tixmessage = req.body.tixmessage;
   
    
   const sql = "INSERT INTO tickets (subject, status, assigned_to, name, email2, phonenumber, tixmessage) VALUES ($1, $2, $3, $4, $5, $6, $7)"; 
   
   client.query(sql, [subject, status, assigned_to, name, email2, phonenumber, tixmessage], (error, results) => {
      
   res.status(200).send("Ticket submitted successfully");
 
   })
});



// Routes
app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

app.get('/api/tickets/:id', (req, res) => {
  
  const ticketId = parseInt(req.params.id);
  const ticket = ticket.find(ticket => ticket.id === ticketId);
  if (ticket) {
      res.json(ticket);
  } else {
      res.status(404).send('Ticket not found');
  }
});

// DELETE route to delete a ticket
app.delete('/api/tickets/:id', async (req, res) => {
  const ticketId = req.params.id;
  try {
    const result = await pool.query('DELETE FROM tickets WHERE id = $1', [ticketId]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Ticket not found' });
    } else {
      res.json({ message: 'Ticket deleted successfully' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/tickets/:id', async (req, res) => {
  const ticketId = req.params.id;
  try {
    const result = await client.query('DELETE FROM tickets WHERE id = $1', [ticketId]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Ticket not found' });
    } else {
      res.json({ message: 'Ticket deleted successfully' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// PUT route to update a ticket by ID
app.put('/api/tickets/:id', async (req, res) => {
  const ticketId = req.params.id;
  const { subject, status, assigned_to, name, email2, phonenumber, tixmessage } = req.body;
  try {
    await pool.query(
      'UPDATE tickets SET subject = $1, status = $2, assigned_to = $3, name = $4, email2 = $5, phonenumber = $6, tixmessage = $7 WHERE id = $8',
      [subject, status, assigned_to, name, email2, phonenumber, tixmessage, ticketId]
    );
    res.json({ message: 'Ticket updated successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/tickets/:id', async (req, res) => {
  const ticketId = req.params.id;
  const { subject, status, assigned_to, name, email2, phonenumber, tixmessage } = req.body;
  try {
    await client.query(
      'UPDATE tickets SET subject = $1, status = $2, assigned_to = $3, name = $4, email2 = $5, phonenumber = $6, tixmessage = $7 WHERE id = $8',
      [subject, status, assigned_to, name, email2, phonenumber, tixmessage, ticketId]
    );
    res.json({ message: 'Ticket updated successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// PATCH route to mark a ticket as closed by ID
app.patch('/api/tickets/:id/close', async (req, res) => {
  const ticketId = req.params.id;
  try {
    await pool.query('UPDATE tickets SET status = $1 WHERE id = $2', ['Closed', ticketId]);
    res.json({ message: 'Ticket closed successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(3000, () => {
   console.log("Listening on port 3000");
});









