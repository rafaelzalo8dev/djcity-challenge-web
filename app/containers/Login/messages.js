/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Login';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Login container!',
  },
  welcome: 'Welcome to the DJCity Challenge',
  autor: 'Rafael Zavala',
  date: '08/Dec/2021',
  buttons: {
    submit: 'Start searching',
  },
  inputs: {
    email: 'Email',
    password: 'Password',
  },
});
