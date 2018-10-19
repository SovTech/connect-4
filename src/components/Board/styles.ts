import { ArrowDownCircle, XCircle } from 'react-feather';
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
    
  &.active {
    color: ${theme.baseColor};
    cursor: pointer;
  }
`;

export const StyledCircle = styled(XCircle)`
  color: ${theme.disabledColor};
`;
