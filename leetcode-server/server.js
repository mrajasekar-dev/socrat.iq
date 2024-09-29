const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/run', async (req, res) => {
  const { language_id, source_code } = req.body;
  try {
    const { data } = await axios.post('https://api.judge0.com/submissions', {
      source_code,
      language_id
    }, {
      headers: { 'Content-Type': 'application/json' },
      params: { base64_encoded: 'false', wait: 'true' },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to execute code.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
