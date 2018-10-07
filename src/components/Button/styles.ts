import theme from '../../theme';
import styled from 'styled-components';
import { IS_TEST } from '../../constants';
import { ButtonProps } from './index';

export const Button = styled<ButtonProps, 'button'>('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
  border-radius: ${theme.borderRadius};
  margin: ${props => props.noMargin ? 0 : theme.marginQuarter};
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
  cursor: pointer;
  outline: 0;
  font-size: ${theme.h4Size};
  font-weight: 500;
  color: ${theme.textColor};
  transition: all 0.3s ease;
  border: 0;
  border-bottom: thick solid ${theme.overlayColorLight};
  overflow: hidden;
  padding: ${theme.marginHalf} ${theme.margin};
  width: 100%;
  background-color: ${IS_TEST ? theme.testBackgroundColor : theme.baseColorDarker20};
     
  &:hover {
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: ${IS_TEST ? theme.testBackgroundColor : theme.baseColorDarker20};
  }
`;

export const Icon = styled.div`
  padding-right: ${theme.marginHalf};
  display: flex;
  align-items: center;
  justify-content: center;

  * {
    stroke: ${theme.inverseTextColor};
  }
`;