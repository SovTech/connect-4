import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar, Card } from '../index';
import { TEST_AVATAR_URL } from '../../constants/dummy_content';

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
        imageUrl={null}
        size={50}
      />
    </Card>
  ))
  .add('User without image - small', () => (
    <Card>
      <Avatar
        imageUrl={null}
        size={30}
      />
    </Card>
  ))
  .add('Non user without image - small', () => (
    <Card>
      <Avatar
        imageUrl={null}
        size={30}
      />
    </Card>
  ));
