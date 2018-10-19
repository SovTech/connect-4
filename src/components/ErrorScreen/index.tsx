// Error message to show when things go wrong

import * as React from 'react';
import { ContainerWrapper, ErrorMessage } from '../index';

const ErrorScreen = () => {
  return (
    <ContainerWrapper>
      <ErrorMessage />
    </ContainerWrapper>
  );
};

export default ErrorScreen;
