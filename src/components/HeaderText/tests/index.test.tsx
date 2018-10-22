import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { H1, H2, H3, H4 } from '../index';

describe('HeaderText Components', () => {
  it('renders a H1 correctly', () => {
    const tree = renderer
      .create(<H1 />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a H2 correctly', () => {
    const tree = renderer
      .create(<H2 />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a H3 correctly', () => {
    const tree = renderer
      .create(<H3 />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a H4 correctly', () => {
    const tree = renderer
      .create(<H4 />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
