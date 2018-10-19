import classnames from 'classnames';
import * as React from 'react';
import { StyledCell } from './styles';

type Props = {
  cell: string;
}

export default class Cell extends React.Component<Props> {
  render() {
    const {cell} = this.props;
    const cellClasses = classnames({
      'red': cell === 'RED',
      'yellow': cell === 'YELLOW'
    });

    return (
      <StyledCell className={cellClasses} />
    );
  }

}
