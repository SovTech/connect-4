// Games fragment - loops through a given list of games

import * as React from 'react';
import Transition from 'react-transition-group/Transition';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';
import { Game } from '../../../custom-typings/Game';
import GameCard from '../GameCard';

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  transform: `scale(0)`
};

const transitionStyles = {
  entering: {opacity: 0, transform: `translateY(100vh)`},
  entered: {opacity: 1, transform: `translateY(0)`}
};

type TransitionState = 'entering' | 'entered'

interface Props {
  subscribeToNewGames: Function,
  games: Game[]
}

export default class Games extends React.Component<Props> {
  componentDidMount() {
    this.props.subscribeToNewGames();
  }

  render() {
    return (
      <TransitionGroup>
        {this.props.games.map((game: Game, index: number) => {
          return (
            <Transition in={true} timeout={duration + (index * 100)} appear={true} key={game.id}>
              {(state: TransitionState) => (
                <GameCard
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}
                  {...game}
                />
              )}
            </Transition>
          );
        })}
      </TransitionGroup>
    );
  }
}
