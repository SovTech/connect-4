import * as React from 'react';

type Props = {
  restart: Function;
  board: any;
}

export default class BoardStatus extends React.Component<Props> {
  render() {
    let nextTurn;

    if (this.props.board.isActive) {
      nextTurn = (
        <div>
          <div className='connect4-label'>Next turn:</div>
          <div>{this.props.board.nextPlayer}</div>
        </div>);
    } else {
      nextTurn = (
        <div>Game over!</div>);
    }

    return (
      <div>
        <div>
          {nextTurn}
        </div>
        <p>
          <button onClick={() => this.props.restart()}>Restart game</button>
        </p>
      </div>
    );
  }
}
