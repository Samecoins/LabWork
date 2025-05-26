const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const OPENAI_API_KEY = '';

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: req.body.messages,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Ошибка от OpenAI:', error.response?.data || error.message);
    res.status(500).json({ error: 'Ошибка при обращении к OpenAI' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🟢 Прокси-сервер запущен на http://localhost:${PORT}`);
});
