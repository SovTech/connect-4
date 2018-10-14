import classNames from 'classnames';
import * as React from 'react';
import { Cell } from '../index';
import { BoardWrapper, Column } from './styles';

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
          {column.map((cell, x) => {
            return (
              <Cell
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
