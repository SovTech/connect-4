// User and Client Avatar to keep them all consistent

import * as React from 'react';
import { AvatarInner, AvatarWrapper } from './styles';

type Props = {
  imageUrl?: string;
  size: 30 | 40 | 50 | 80;
  activeColor?: 'RED' | 'YELLOW';
}

const Avatar = (props: Props) => {
  return (
    <AvatarWrapper size={props.size} className={props.activeColor}>
      {props.imageUrl
        ? <AvatarInner
          size={props.size}
          style={{backgroundImage: `url("${props.imageUrl}")`}}
        />
        : null}
    </AvatarWrapper>
  );
};

export default Avatar;
