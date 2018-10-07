import * as React from 'react';
import { storiesOf } from '@storybook/react';
import GameStatusButton from './index';
import ContainerWrapper from '../ContainerWrapper';

storiesOf('Game Status Button', module)
  .add('Free', () => (
    <ContainerWrapper>
      <GameStatusButton
        onClick={() => null}
        status='FREE'
      />
    </ContainerWrapper>
  ))
  .add('Loading', () => (
    <ContainerWrapper>
      <GameStatusButton
        onClick={() => null}
        status='LOADING'
      />
    </ContainerWrapper>
  ))
  .add('Offline', () => (
    <ContainerWrapper>
      <GameStatusButton
        onClick={() => null}
        status='OFFLINE'
      />
    </ContainerWrapper>
  ))
  .add('BUSY', () => (
    <ContainerWrapper>
      <GameStatusButton
        onClick={() => null}
        status='BUSY'
      />
    </ContainerWrapper>
  ));
