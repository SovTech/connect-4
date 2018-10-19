import classnames from 'classnames';
import * as React from 'react';
import { StyledCell } from './styles';

type Props = {
  x: number;
  y: number;
  cell: string;
  gameId: string;
  isActive: boolean;
}

export default class Cell extends React.Component<Props> {
  render() {
    const cellClasses = classnames({
      'red': this.props.cell === 'RED',
      'yellow': this.props.cell === 'YELLOW'
    });

    return (
      <StyledCell className={cellClasses} />
    );
  }

}
