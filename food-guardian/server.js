require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import JWT

const app = express();
const port = 3000;

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET; // Use the secret key from environment variables
console.log('JWT_SECRET:', JWT_SECRET);

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jasweer@123',
    database: 'food_guardian'
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Additional routes (index.html or others)
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// User Registration
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({
                status: 'error',
                message: 'Server error while hashing password'
            });
        }

        // SQL query to insert the user into the database
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        connection.query(query, [name, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({
                    status: 'error',
                    message: 'Server error while inserting user'
                });
            }

            // Respond with a success message
            res.status(200).json({
                status: 'success',
                message: 'Registration successful'
            });
        });
    });
});


// User Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received with email:', email);
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ auth: false, message: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ auth: false, message: 'Invalid email or password' });
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ auth: false, message: 'Server error' });
            }
            if (!isMatch) {
                return res.status(401).json({ auth: false, message: 'Invalid email or password' });
            }
            // Generate a JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ auth: true, token });
        });
    });
});

// Food Request
app.post('/request-food', (req, res) => {
    const { name, email, address, phone } = req.body;
    const query = 'INSERT INTO food_requests (name, email, address, phone) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, address, phone], (err, results) => {
        if (err) {
            console.error('Error inserting food request:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Food request submitted');
    });
});

// Donation
app.post('/donate', (req, res) => {
    const { name, amount } = req.body;
    
    if (!name || !amount) {
        return res.status(400).send('Name and amount are required');
    }
    
    const query = 'INSERT INTO donations (name, amount) VALUES (?, ?)';
    connection.query(query, [name, amount], (err, results) => {
        if (err) {
            console.error('Error inserting donation:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Donation successful');
    });
});

// Volunteer Signup
app.post('/volunteer', (req, res) => {
    const { name, email, phone, availability } = req.body;
    const query = 'INSERT INTO volunteers (name, email, phone, availability) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, phone, availability], (err, results) => {
        if (err) {
            console.error('Error inserting volunteer:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Volunteer Request submitted successfully');
    });
});

// Handle 'Get Involved' form submissions
app.post('/get-involved', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }

    const query = 'INSERT INTO interests (name, email, message) VALUES (?, ?, ?)';
    connection.query(query, [name, email, message], (err, results) => {
        if (err) {
            console.error('Error inserting interest:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Interest form submitted successfully');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Middleware to authenticate the user
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Invalid token:', err);
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Get User Profile
app.get('/profile', authenticateToken, (req, res) => {
    const { email } = req.user; // Assume email is available in the JWT payload

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length === 0) {
            console.warn('User not found:', email);
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(results[0]);
    });
});
