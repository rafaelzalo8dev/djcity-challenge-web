/**
 *
 * Login
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Input, Button } from '@material-ui/core';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

import {
  FormContainer,
  InputContainer,
  ActionContainer,
  Title,
} from './styles';

import { login, verifyRecaptcha } from '../../services/auth';

import messages from './messages';

const RecaptchaButton = props => {
  const [firstTime, setFirstTime] = useState(true);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha('login');
    const verifyToken = await verifyRecaptcha(token);
    props.onClickVerified(verifyToken);
  }, []);

  useEffect(() => {
    if (!firstTime) handleReCaptchaVerify();
    setFirstTime(false);
  }, [handleReCaptchaVerify]);

  return <Button onClick={handleReCaptchaVerify}>Verify recaptcha</Button>;
};
export function Login(props) {
  const { history } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verified, setVerified] = useState(false);

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

  const onClickVerified = result => {
    if (result.success) setVerified(true);
    alert(
      `Recaptcha verified succesfully with a score: ${
        result.score
      } reaching the 1`,
    );
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
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
          <GoogleReCaptchaProvider
            reCaptchaKey="6Le0Mo0dAAAAAM4Sb1pn4p3c3BPFREV0jrc4h6hl"
            render="explicit"
          >
            <RecaptchaButton onClickVerified={onClickVerified} />
          </GoogleReCaptchaProvider>
        </ActionContainer>
s        <ActionContainer>
          <Button
            onClick={() => onSubmitLogin()}
            disabled={!email || !password || !verified}
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
