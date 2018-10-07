import theme from '../../theme';
import styled from 'styled-components';
import { IS_TEST } from '../../constants';

export const HeaderOuter = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-bottom: thick solid ${theme.overlayColorLight};
  overflow: hidden;
  position: fixed;
  height: ${theme.headerHeight};
  width: 100vw;
  top: 0;
  background-color: ${IS_TEST ? theme.testBackgroundColor : theme.baseColor};
  z-index: 1;
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: calc(100% - ${theme.margin});
  max-width: calc(${theme.maxContentWidth} - ${theme.margin});
`;

export const HeaderButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin: ${theme.marginQuarter};
`;