// Card

import * as React from 'react';
import TimeAgo from 'react-timeago';
import { H3 } from '../HeaderText';
import { CardInner, CardWrapper, PaddedContent, TitleWrapper } from './styles';

type Props = {
  children?: any;
  style?: React.CSSProperties;
  date?: string;
  loading?: boolean;
  titleLoader?: boolean;
  noPadding?: boolean;
  contentPadding?: boolean;
  greyBG?: boolean;
  title?: string;
  onClick?: Function;
  className?: string;
}

export default (props: Props) => (
  <CardWrapper style={props.style}>
    <CardInner>
      {props.title
        ? <TitleWrapper>
          {props.loading && props.titleLoader ? <div /> : <H3>{props.title}</H3>}
          {props.date ? <TimeAgo date={props.date} /> : <div />}
        </TitleWrapper>
        : null}
      {props.contentPadding ? <PaddedContent>{props.children}</PaddedContent> : props.children}
    </CardInner>
  </CardWrapper>
)
