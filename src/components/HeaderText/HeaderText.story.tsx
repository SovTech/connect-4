import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ContainerWrapper from '../ContainerWrapper';
import { H1, H2, H3, H4 } from './index';

storiesOf('Header Text', module)
  .add('H1', () => (
    <ContainerWrapper>
      <H1>I am an H1 Header</H1>
    </ContainerWrapper>
  ))
  .add('H2', () => (
    <ContainerWrapper>
      <H2>I am an H2 Header</H2>
    </ContainerWrapper>
  ))
  .add('H3', () => (
    <ContainerWrapper>
      <H3>I am an H3 Header</H3>
    </ContainerWrapper>
  ))
  .add('H4', () => (
    <ContainerWrapper>
      <H4>I am an H4 Header</H4>
    </ContainerWrapper>
  ));
