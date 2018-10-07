import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Card from '../Card';
import ContainerWrapper from '../ContainerWrapper';

storiesOf('Card', module)
  .add('All', () => (
    <ContainerWrapper>
      <Card
        noPadding={true}
        contentPadding={true}
        title='Title'
      >
        <div>With some content</div>
      </Card>
    </ContainerWrapper>
  ));
