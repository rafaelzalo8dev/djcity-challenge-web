import axios from 'axios';

const apiCall = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export const get = url =>
  new Promise((resolve, reject) => {
    apiCall
      .get(url)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });

export const post = data => {
  console.log('data ', data);
  return new Promise((resolve, reject) => {
    apiCall
      .post(data.url, data.body)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
