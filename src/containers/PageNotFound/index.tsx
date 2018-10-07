// 404 Page

import * as React from 'react';
import { ContainerWrapper, H1, H2, H3 } from '../../components';
import styled from 'styled-components';
import theme from '../../theme';

const NotFoundWrapper = styled.div`
  h1, h2, h3 {
    color: ${theme.textColor};
  }
`;

export const PageNotFound: React.SFC<{}> = () => {
  return (
    <ContainerWrapper>
      <NotFoundWrapper>
        <H1>Ah turkey burgers!</H1>
        <H2>The thing you are looking for is not a thing.</H2>
        <H3>Maybs look for another thing?</H3>
      </NotFoundWrapper>
    </ContainerWrapper>
  );
};