const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Ensure body-parser is included

const app = express();
const port = process.argv[2] === 'local' ? 3001 : 3002; // Use 3001 for local and 3002 for production

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from "ITC505/lab-7"
const publicServedFilesPath = path.join(__dirname, 'ITC505', 'lab-7');
app.use(express.static(publicServedFilesPath));

// Serve the form page
app.get('/ITC505/lab-7/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'ITC505', 'lab-7', 'index.html'));
});

// Handle form submission
app.post('/ITC505/lab-7/index.html', (req, res) => {
  const { adjective, noun, verb, place, animal } = req.body;
  if (!adjective || !noun || !verb || !place || !animal) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
    `);
    return;
  }
  
  const madLib = `Once upon a time, a very ${adjective} ${noun} decided to ${verb} in the ${place}. To its surprise, it found a ${animal} there.`;
  
  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
  `);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
