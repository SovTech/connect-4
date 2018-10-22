import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ContainerWrapper from '../index';

it('renders a Cell correctly', () => {
  const tree = renderer
    .create((
      <ContainerWrapper>
        <div>das kinders</div>
      </ContainerWrapper>))
    .toJSON();
  expect(tree).toMatchSnapshot();
});
