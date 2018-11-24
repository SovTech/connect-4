import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Avatar from '../index';

describe('Avatar Component', () => {
  it('renders a user Avatar correctly when there is a url', () => {
    const tree = renderer
      .create(<Avatar imageUrl='https://dummyimage.png' size={50} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a user Avatar correctly when there is no url', () => {
    const tree = renderer
      .create(<Avatar size={50} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a non-user Avatar correctly when there is a url', () => {
    const tree = renderer
      .create(<Avatar imageUrl='https://dummyimage.png' size={50} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a non-user Avatar correctly when there is no url', () => {
    const tree = renderer
      .create(<Avatar size={50} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a small Avatar correctly', () => {
    const tree = renderer
      .create(<Avatar imageUrl='https://dummyimage.png' size={30} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
