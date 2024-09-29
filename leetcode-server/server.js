const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const RAPIDAPI_HOST = 'judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY; // Ensure you have this key in your .env file

app.post('/run', async (req, res) => {
  const { language_id, source_code } = req.body;

  try {
    // First API call: Submit the code for execution
    const submissionResponse = await axios.post(
      `https://${RAPIDAPI_HOST}/submissions`,
      {
        language_id,
        source_code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
        params: {
          base64_encoded: 'false',
          wait: 'false',
          fields: '*',
        },
      }
    );

    const { token } = submissionResponse.data;

    // Function to poll the submission result
    const getSubmissionResult = async (token) => {
      while (true) {
        // Second API call: Get the execution result
        const resultResponse = await axios.get(
          `https://${RAPIDAPI_HOST}/submissions/${token}`,
          {
            headers: {
              'x-rapidapi-host': RAPIDAPI_HOST,
              'x-rapidapi-key': RAPIDAPI_KEY,
            },
            params: {
              base64_encoded: 'false',
              fields: '*',
            },
          }
        );

        const statusId = resultResponse.data.status.id;

        // Status IDs 1 and 2 mean "In Queue" and "Processing"
        if (statusId !== 1 && statusId !== 2) {
          return resultResponse.data;
        }

        // Wait for 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    const resultData = await getSubmissionResult(token);
    res.json(resultData);
  } catch (error) {
    console.error('Error executing code:', error);
    res.status(500).send('Failed to execute code.');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
