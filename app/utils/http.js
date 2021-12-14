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

export const post = data =>
  new Promise((resolve, reject) => {
    apiCall
      .post(data.url, data.body)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });

export const postRecaptcha = data =>
  new Promise((resolve, reject) => {
    const VERIFY_URL =
      'https://cors-anywhere.herokuapp.com/https://www.google.com/recaptcha/api/siteverify';
    return fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${data.body.secret}&response=${data.body.response}`,
    })
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
