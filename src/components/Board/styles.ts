import { ArrowDownCircle } from 'react-feather';
import styled from 'styled-components';
import theme from '../../theme';

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledArrowDown = styled(ArrowDownCircle)`
  color: ${theme.disabledColor};
    
  &.active:hover {
    color: ${theme.baseColor};
    cursor: pointer;
  }
`;
