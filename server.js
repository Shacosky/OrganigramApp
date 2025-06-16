const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store of employees
let employees = [];

// Add employee { id, name, managerId }
app.post('/api/employees', (req, res) => {
  const { name, managerId } = req.body;
  const id = employees.length + 1;
  employees.push({ id, name, managerId: managerId || null });
  res.json({ id });
});

// Get all employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
