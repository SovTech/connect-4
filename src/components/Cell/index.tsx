import classnames from 'classnames';
import * as React from 'react';
import { StyledCell } from './styles';

type Props = {
  x: number;
  y: number;
  cell: string;
  nextPlayer: string;
  addPiece: Function;
}

export default class Cell extends React.Component<Props> {
  handleAddPiece = () => {
    this.props.addPiece(this.props.y, this.props.nextPlayer);
  };

  render() {
    const cellClasses = classnames({
      'red': (this.props.cell === 'red'),
      'yellow': (this.props.cell === 'yellow')
    });

    return (
      <StyledCell
        className={cellClasses}
        onClick={this.handleAddPiece}
      />
    );
  }

}
