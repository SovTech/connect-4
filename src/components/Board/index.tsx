import classNames from 'classnames';
import * as React from 'react';
import { Cell } from '../index';
import { BoardWrapper, Column } from './styles';

type Props = {
  board: any;
  addPiece: Function;
}

export default class Board extends React.Component<Props> {
  render() {
    // Shortcut to props board
    let board = this.props.board;

    // Grid CSS classes
    let boardClasses = classNames({
      'connect4-board--active': board.isActive,
      'connect4-board--inactive': !board.isActive
    });

    // Array of cells
    let cells = board.grid.map((column: any[], y: number) => {
      return (
        <Column key={`column-${y}`}>
          {column.map((cell, x) => {
            return (
              <Cell
                key={`cell-${x}-${y}`}
                x={x}
                y={y}
                cell={cell.toString()}
                nextPlayer={board.nextPlayer}
                addPiece={this.props.addPiece}
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
