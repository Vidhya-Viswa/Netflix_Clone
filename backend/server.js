const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests from frontend
app.use(bodyParser.json());

// Mock credentials (no database)
const mockUser = {
  email: 'user@example.com',
  password: 'password123'
};

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  // Check against mock data
  if (email === mockUser.email && password === mockUser.password) {
    return res.status(200).json({ success: true, message: 'Login successful!' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});