// Room Status Button - togglable to show the status of the room

import * as React from 'react';
import { Button } from './styles';

export type RoomStatusButtonProps = {
  status: RoomStatus;
}

export default (props: RoomStatusButtonProps & React.HTMLProps<HTMLButtonElement>) => {
  return (
    <Button
      title={`The room is currently ${props.status}`}
      status={props.status}
      onClick={props.onClick}
    >
      {props.status === 'FREE'
        ? '👍'
        : props.status === 'LOADING'
          ? '🐐'
          : props.status === 'OFFLINE'
            ? '🐢'
            : '👎'}
    </Button>
  );
}
