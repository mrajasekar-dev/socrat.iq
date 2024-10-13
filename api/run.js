const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jsforce = require('jsforce');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const RAPIDAPI_HOST = 'judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const PORT = process.env.PORT || 5000;

console.log('Server starting...'); // Debug: Server startup

app.post('/run', async (req, res) => {
  console.log('Received /run request:', req.body); // Debug: Incoming request
  const { language_id, source_code } = req.body;

  try {
    console.log('Submitting code for execution...'); // Debug: Before submission
    const submissionResponse = await axios.post(
      `https://${RAPIDAPI_HOST}/submissions`,
      { language_id, source_code },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
        params: { base64_encoded: 'false', wait: 'false', fields: '*' },
      }
    );
    console.log('Submission response:', submissionResponse.data); // Debug: Submission response

    const { token } = submissionResponse.data;

    const getSubmissionResult = async (token) => {
      console.log('Polling for submission result...'); // Debug: Start polling
      while (true) {
        console.log('Fetching result for token:', token); // Debug: Each poll attempt
        const resultResponse = await axios.get(
          `https://${RAPIDAPI_HOST}/submissions/${token}`,
          {
            headers: {
              'x-rapidapi-host': RAPIDAPI_HOST,
              'x-rapidapi-key': RAPIDAPI_KEY,
            },
            params: { base64_encoded: 'false', fields: '*' },
          }
        );
        console.log('Result response:', resultResponse.data); // Debug: Poll response

        const statusId = resultResponse.data.status.id;
        if (statusId !== 1 && statusId !== 2) {
          console.log('Final result received'); // Debug: Final result
          return resultResponse.data;
        }
        console.log('Waiting before next poll...'); // Debug: Before wait
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    const resultData = await getSubmissionResult(token);
    console.log('Sending final result to client:', resultData); // Debug: Before sending response
    res.json(resultData);
  } catch (error) {
    console.error('Error executing code:', error); // Debug: Detailed error log
    res.status(500).send('Failed to execute code.');
  }
});

app.post('/askSocrates', async (req, res) => {
  console.log('Received /askSocrates request:', req.body); // Debug: Incoming request
  const { code } = req.body;

  const prompt = `Analyze the following code: ${code} and give a short thought-provoking comment that is a question. But the question has to lead the user to think better logic for the problem. It has to have an example output or something for reference. Just output the question alone in text. No formatting needed.`;

  try {
    console.log('Sending request to Gemini API...'); // Debug: Before API call
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + process.env.GOOGLE_API_KEY,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Gemini API response:', response.data); // Debug: API response

    const socraticResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Socrates.';
    console.log('Sending Socratic response to client:', socraticResponse); // Debug: Before sending response
    res.json({ response: socraticResponse });
  } catch (error) {
    console.error('Error fetching Socratic response:', error); // Debug: Detailed error log
    res.status(500).json({ error: 'Error fetching Socratic response.' });
  }
});

const username = process.env.SALESFORCE_USERNAME;
const password = process.env.SALESFORCE_PASSWORD;
const clientId = process.env.SALESFORCE_CLIENT_ID;
const clientSecret = process.env.SALESFORCE_CLIENT_SECRET;
const loginUrl = 'https://login.salesforce.com';

app.post('/salesforce/auth', async (req, res) => {
  const { accountId } = req.body;

  const conn = new jsforce.Connection({
    oauth2: {
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: 'http://localhost:' + PORT + '/oauth2/callback'
    },
    loginUrl: loginUrl
  });

  try {
    await conn.login(username, password);

    console.log('Authenticated with Salesforce!');

    const accountData = await conn.apex.get(`/accountData/${accountId}`);
    console.log('account Data here: ' + accountData);
    res.status(200).json(accountData);

  } catch (err) {
    console.error('Error authenticating or fetching data from Salesforce:', err);
    res.status(500).json({ error: 'Failed to authenticate or fetch data from Salesforce' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Debug: Server started
});
