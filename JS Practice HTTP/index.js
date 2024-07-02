const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const API_KEY = '0de15593ca6968fdba22d12f6bff8c7b';
const city = "Minsk"

app.get('/weather-200', async (req, res) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

app.get('/weather-401', async (req, res) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ASD`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

app.get('/weather-404', async (req, res) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=ASD&appid=${API_KEY}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

//не работает, но должно (429.png)
app.get('/weather-429', async (req, res) => {
    try {
      for (let i = 0; i < 500; i++) {
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      }
      res.status(200).json({ message: 'succeed' });
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
