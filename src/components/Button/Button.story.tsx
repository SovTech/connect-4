import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Card } from '../index';
import { action } from '@storybook/addon-actions';

storiesOf('Button', module)
  .add('Regular', () => (
    <Card
      title='Buttons'
    >
      <Button
        onClick={action('onClick')}
        text='Nothing to see here'
      />
    </Card>
  ))
  .add('Disabled', () => (
    <Card
      title='Buttons'
    >
      <Button
        onClick={action('onClick')}
        disabled={true}
        text='This button is disabled'
      />
    </Card>
  ))
  .add('Loading', () => (
    <Card
      title='Buttons'
    >
      <Button
        onClick={action('onClick')}
        isLoading={true}
        text='This button is loading'
      />
    </Card>
  ))
  .add('Icon', () => (
    <Card
      title='Buttons'
    >
      <Button
        onClick={action('onClick')}
        text='Icon Button'
      />
    </Card>
  ))
  .add('Long text', () => (
    <Card
      title='Buttons'
    >
      <Button
        onClick={action('onClick')}
        text='This is a button with some really long text.
                 Its going to mess things up on purpose.
                  Nothing to see here. Ignore all of this.'
      />
    </Card>
  ));
