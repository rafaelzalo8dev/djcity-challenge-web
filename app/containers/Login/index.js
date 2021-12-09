/**
 *
 * Login
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Input, Button } from '@material-ui/core';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from 'react-google-recaptcha-v3';

import {
  FormContainer,
  InputContainer,
  ActionContainer,
  Title,
} from './styles';

import { login } from '../../services/auth';

import messages from './messages';

export function Login(props) {
  const { history } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/list');
    }
  }, []);

  const onSubmitLogin = async () => {
    if (email && password) {
      try {
        const response = await login(email, password);
        const { token, user } = response;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        history.push('/list');
      } catch (err) {
        alert('Error while trying to log your user');
      }
    }
  };

  const handleVerify = () => {
    console.log('en el handle verify');
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <GoogleReCaptchaProvider reCaptchaKey="6Le0Mo0dAAAAAM4Sb1pn4p3c3BPFREV0jrc4h6hl">
        <GoogleReCaptcha onVerify={handleVerify} />
      </GoogleReCaptchaProvider>
      <Title>DJ City - Challenge</Title>
      <FormContainer>
        <Title>Login to search your favorite songs on iTunes API</Title>
        <InputContainer>
          <Input
            placeholder={messages.inputs.email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            type="email"
          />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder={messages.inputs.password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            type="password"
          />
        </InputContainer>
        <ActionContainer>
          <Button
            onClick={() => onSubmitLogin()}
            disabled={!email || !password}
          >
            {messages.buttons.submit}
          </Button>
        </ActionContainer>
      </FormContainer>
      <Title>Autor: Rafael Zavala</Title>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object,
};

const withConnect = connect(null);

export default compose(
  withConnect,
  memo,
)(Login);
