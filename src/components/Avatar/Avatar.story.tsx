import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { TEST_AVATAR_URL } from '../../constants/dummy_content';
import { Avatar, Card } from '../index';

storiesOf('Avatar', module)
  .add('User with image', () => (
    <Card>
      <Avatar
        imageUrl={TEST_AVATAR_URL}
        size={50}
      />
    </Card>
  ))
  .add('User without image', () => (
    <Card>
      <Avatar
        size={50}
      />
    </Card>
  ))
  .add('User without image - small', () => (
    <Card>
      <Avatar
        size={30}
      />
    </Card>
  ))
  .add('Non user without image - small', () => (
    <Card>
      <Avatar
        size={30}
      />
    </Card>
  ));
