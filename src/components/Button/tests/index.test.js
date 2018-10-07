import React from 'react'
import Button from '../index'
import renderer from 'react-test-renderer'

it('renders a Button correctly', () => {
    const tree = renderer
        .create(<Button
            text='Button Title'
            onClick={() => console.log('onClick')}
        />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})

it('renders a disabled Button correctly', () => {
    const tree = renderer
        .create(<Button
            disabled
            text='Button Title'
            onClick={() => console.log('onClick')}
        />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})

it('renders a loading Button correctly', () => {
    const tree = renderer
        .create(<Button
            isLoading
            text='Button Title'
            onClick={() => console.log('onClick')}
        />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})
