import styled from 'styled-components';
import theme from '../../theme';

const cellSize = '30px';

export const StyledCell = styled.button`
  background: ${theme.disabledColorLight};
  border-radius: 50%;
  border: none;
  color: #333;
  display: inline-block;
  font-size: 12px;
  height: ${cellSize};
  margin: 5px auto;
  outline: none;
  padding: 0;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  width: ${cellSize};

  &.red {
    background-color: ${theme.error} !important;
  }

  &.yellow {
    background-color: ${theme.warning} !important;
  }
`;
