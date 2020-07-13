const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  timeout: 1000,
  headers: { 'x-api-key': 'c5445295-f86a-4c6e-9e37-2cc95d5b2888' },
});

export default instance;
