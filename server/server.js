const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/aijournal', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define a Mongoose Model
const textSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const Text = mongoose.model('Text', textSchema);

app.use(bodyParser.json());

app.post('/api/saveText', (req, res) => {
  const { text } = req.body;
  const newText = new Text({ text });

  newText.save((err, savedText) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Text saved: ' + savedText.text);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});