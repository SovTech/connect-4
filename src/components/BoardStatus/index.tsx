import * as React from 'react';

type Props = {
  nextPlayer: string;
  isActive: boolean;
}

export default class BoardStatus extends React.Component<Props> {
  render() {
    let nextTurn;

    if (this.props.isActive) {
      nextTurn = <div className='connect4-label'>Next turn: {this.props.nextPlayer}</div>;
    } else {
      nextTurn = (
        <div>Game over!</div>);
    }

    return (
      <div>
        <div>
          {nextTurn}
        </div>
      </div>
    );
  }
}
