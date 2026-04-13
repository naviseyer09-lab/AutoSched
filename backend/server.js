const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your-secret-key'; // Change in production

app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    duration INTEGER,
    price REAL,
    category TEXT
  `);
  db.run(`ALTER TABLE services ADD COLUMN category TEXT`, [], (err) => {
    // Ignore duplicate column if it already exists
  });

  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    service_id INTEGER,
    staff_id INTEGER,
    date TEXT,
    time TEXT,
    status TEXT,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (staff_id) REFERENCES users(id)
  )`);

  // Insert sample data
  const hashed = bcrypt.hashSync('password', 10);
  db.run(`INSERT OR IGNORE INTO services (name, description, duration, price, category) VALUES 
    ('Oil Change', 'Complete oil change service', 60, 50.00, 'Maintenance'),
    ('Brake Service', 'Brake inspection and replacement', 90, 150.00, 'Repair'),
    ('Tire Rotation', 'Rotate tires for even wear', 30, 25.00, 'Maintenance'),
    ('Engine Diagnostic', 'Check engine performance', 45, 75.00, 'Diagnostic')
  `);

  db.run(`INSERT OR IGNORE INTO users (name, email, password, role) VALUES 
    ('Admin User', 'admin@demo.com', ?, 'admin'),
    ('Staff User', 'staff@demo.com', ?, 'staff')
  `, [hashed, hashed]);
});

// Routes
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });
});

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Services
app.get('/api/services', (req, res) => {
  db.all('SELECT * FROM services', [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/services', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { name, description, duration, price, category } = req.body;
  db.run('INSERT INTO services (name, description, duration, price, category) VALUES (?, ?, ?, ?, ?)', [name, description, duration, price, category], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

app.put('/api/services/:id', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { id } = req.params;
  const { name, description, duration, price, category } = req.body;
  db.run('UPDATE services SET name = ?, description = ?, duration = ?, price = ?, category = ? WHERE id = ?', [name, description, duration, price, category, id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Service not found' });
    res.json({ id });
  });
});

app.delete('/api/services/:id', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { id } = req.params;
  db.run('DELETE FROM services WHERE id = ?', [id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Service not found' });
    res.json({ success: true });
  });
});

// Appointments
app.get('/api/appointments', authenticate, (req, res) => {
  let query = 'SELECT a.*, u.name as customer_name, s.name as service_name FROM appointments a JOIN users u ON a.customer_id = u.id JOIN services s ON a.service_id = s.id';
  const params = [];
  if (req.user.role === 'customer') {
    query += ' WHERE a.customer_id = ?';
    params.push(req.user.id);
  } else if (req.user.role === 'staff') {
    query += ' WHERE a.staff_id = ?';
    params.push(req.user.id);
  }
  db.all(query, params, (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/appointments', authenticate, (req, res) => {
  const { service_id, staff_id, date, time } = req.body;
  db.run('INSERT INTO appointments (customer_id, service_id, staff_id, date, time, status) VALUES (?, ?, ?, ?, ?, ?)', [req.user.id, service_id, staff_id, date, time, 'pending'], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Users (admin only)
app.get('/api/users', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  db.all('SELECT id, name, email, role FROM users', [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});