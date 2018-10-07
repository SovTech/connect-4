import React from 'react'
import Card from '../index'
import renderer from 'react-test-renderer'

it('renders a Card correctly', () => {
    const tree = renderer
        .create(<Card
            title='Card Title'
            onClick={() => console.log('onClick')}
        />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})

it('renders a Card correctly when loading', () => {
    const tree = renderer
        .create(<Card
            loading
            title='Card Title'
            onClick={() => console.log('onClick')}
        />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})

it('renders a Card correctly when loading with a title loading indicator', () => {
    const tree = renderer
        .create(<Card
            loading
            noPadding
            contentPadding
            greyBG
            title='Card Title'
            onClick={() => console.log('onClick')}
        />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})

it('renders a Card correctly with no title padding, content padding and a grey background', () => {
    const tree = renderer
        .create(<Card
            noPadding
            contentPadding
            greyBG
            title='Card Title'
            onClick={() => console.log('onClick')}
        />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})
