import classNames from 'classnames';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { INSERT_PIECE } from '../../graphql/mutations';
import { ALL_GAMES } from '../../graphql/queries';
import { showToast } from '../../utils';
import { Cell } from '../index';
import { BoardWrapper, Column, StyledArrowDown, StyledCircle } from './styles';

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
            {(insertPiece: Function, {error, loading}) => {
              const clickable = isActive && !loading;
              if (error) {
                showToast('Its not your turn! 🙅', 3000);
              }
              if (clickable) {
                return (
                  <StyledArrowDown
                    size={32}
                    className={clickable ? 'active' : ''}
                    onClick={() => clickable ? insertPiece({variables: {gameId, column: y}}) : null}
                  />
                );
              }
              return <StyledCircle size={32} />;
            }}
          </Mutation>
          {column.map((cell, x) => {
            return (
              <Cell
                key={`cell-${x}-${y}`}
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
