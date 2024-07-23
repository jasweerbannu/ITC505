const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001; // Use environment variable or default to 3001

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
const publicServedFilesPath = path.join(__dirname, 'public');
app.use(express.static(publicServedFilesPath));

// Serve the form page at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(publicServedFilesPath, 'index.html'));
});

// Handle form submission
app.post('/generate-story', (req, res) => {
  const { adjective, noun, verb, place, animal } = req.body;
  if (!adjective || !noun || !verb || !place || !animal) {
    res.status(400).json({ error: 'Please fill out ALL fields.' });
    return;
  }
  
  const madLib = `Once upon a time, a very ${adjective} ${noun} decided to ${verb} in the ${place}. To its surprise, it found a ${animal} there.`;
  
  res.json({ story: madLib });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
