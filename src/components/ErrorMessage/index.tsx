// Error message to show when things go wrong

import * as React from 'react';
import { H2, H3 } from '../HeaderText';
import { Wrapper } from './styles';

const ErrorMessage = () => {
  return (
    <Wrapper>
      <H2>Sommin went wrong 😭</H2>
      <H3>Mayhaps refresh your browser</H3>
      <H3>Mayhaps check your interwebs connection</H3>
    </Wrapper>
  );
};

export default ErrorMessage;
