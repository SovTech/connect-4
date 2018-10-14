import styled from 'styled-components';
import theme from '../../theme';

type WrapperProps = {
  size: 30 | 40 | 50 | 80;
}

type InnerProps = {
  size: 30 | 40 | 50 | 80;
}

export const AvatarWrapper = styled<WrapperProps, 'div'>('div')`
  background-color: ${theme.overlayColor};
  border-radius: 50%;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  
    &.YELLOW {
      border: 4px solid ${theme.warning};
    }
    
    &.RED {
      border: 4px solid ${theme.error};
    }
`;

export const AvatarInner = styled<InnerProps, 'div'>('div')`
  border-radius: 50%;
  background-size: contain;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;
