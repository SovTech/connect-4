import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Card from '../index';

describe('Card Component', () => {
  it('renders a Card correctly', () => {
    const tree = renderer
      .create((
        <Card
          title='Card Title'
          onClick={() => console.log('onClick')}
        />))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Card correctly when loading', () => {
    const tree = renderer
      .create((
        <Card
          loading={true}
          title='Card Title'
          onClick={() => console.log('onClick')}
        />))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Card correctly when loading with a title loading indicator', () => {
    const tree = renderer
      .create((
        <Card
          loading={true}
          noPadding={true}
          contentPadding={true}
          greyBG={true}
          title='Card Title'
          onClick={() => console.log('onClick')}
        />))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Card correctly with no title padding, content padding and a grey background', () => {
    const tree = renderer
      .create((
        <Card
          noPadding={true}
          contentPadding={true}
          greyBG={true}
          title='Card Title'
          onClick={() => console.log('onClick')}
        />))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
