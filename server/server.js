const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/saveText', (req, res) => {
  const { text } = req.body;
  console.log('Received text:', text);
  // Here you would typically save the text to a database
  res.status(200).send('Text saved');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});