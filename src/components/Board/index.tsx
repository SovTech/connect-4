import classNames from 'classnames';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { INSERT_PIECE } from '../../graphql/mutations';
import { ALL_GAMES } from '../../graphql/queries';
import { Cell } from '../index';
import { BoardWrapper, Column, StyledArrowDown } from './styles';

type Props = {
  gameId: string;
  isActive: boolean;
  grid: any[][];
}

export default class Board extends React.Component<Props> {
  render() {
    const {isActive, gameId, grid} = this.props;

    const boardClasses = classNames({
      'connect4-board--active': isActive,
      'connect4-board--inactive': !isActive
    });

    const cells = grid.map((column: any[], y: number) => {
      return (
        <Column key={`column-${y}`}>
          <Mutation mutation={INSERT_PIECE} refetchQueries={[{query: ALL_GAMES}]}>
            {(insertPiece: Function) => (
              <StyledArrowDown
                size={32}
                onClick={() => isActive ? insertPiece({variables: {gameId, column: y}}) : null}
              />
            )}
          </Mutation>
          {column.map((cell, x) => {
            return (
              <Cell
                isActive={isActive}
                gameId={gameId}
                key={`cell-${x}-${y}`}
                x={x}
                y={y}
                cell={cell}
              />
            );
  
          })}
        </Column>
      );
    });

    return (
      <BoardWrapper className={boardClasses}>
        {cells}
      </BoardWrapper>
    );
  }
}
