import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://am3niyafu5.execute-api.us-east-1.amazonaws.com/prod',
});

export default instance;
