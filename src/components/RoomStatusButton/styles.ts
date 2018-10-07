import theme from '../../theme';
import styled from 'styled-components';
import { RoomStatusButtonProps } from './index';

export const Button = styled<RoomStatusButtonProps, 'button'>('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.h4Size};
  box-sizing: border-box;
  text-decoration: none;
  border-radius: 50%;
  margin: ${theme.marginQuarter};
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  cursor: pointer;
  outline: 0;
  color: ${theme.textColor};
  transition: all 0.3s ease;
  border: thick solid white;
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  background-color: ${props => props.status === 'FREE' ? theme.success : theme.error};
  `;