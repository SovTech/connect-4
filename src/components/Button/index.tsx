// Button

import * as React from 'react';
import { Button, Icon } from './styles';

export type ButtonProps = {
  disabled?: boolean,
  isLoading?: boolean,
  noMargin?: boolean,
  text?: string,
  title?: string,
  className?: string,
  icon?: Node,
  onClick: Function | any,
}

export default (props: ButtonProps) => {
  const disabled = props.isLoading || props.disabled;
  return (
    <Button
      title={props.title}
      noMargin={props.noMargin}
      disabled={props.disabled}
      onClick={disabled ? null : props.onClick}
    >
      {props.icon ? <Icon>{props.icon}</Icon> : null}
      {props.isLoading ? 'Loading...' : props.text}
    </Button>
  );
}
