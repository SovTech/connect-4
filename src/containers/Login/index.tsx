// Login Page

import * as React from 'react';
import { Button, ContainerWrapper, H1 } from '../../components';
import { SLACK_CLIENT_URL } from '../../constants';

const Login = () => {
  return (
    <ContainerWrapper>
      <H1>CO</H1>
      <H1>NN</H1>
      <H1>EC</H1>
      <H1>T4</H1>
      <Button text='Login with Slack' onClick={() => window.open(SLACK_CLIENT_URL, '_self')} />
    </ContainerWrapper>
  );
};

export default Login;
