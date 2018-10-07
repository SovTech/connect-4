import theme from '../../theme';
import styled from 'styled-components';

export const ContainerWrapperOuter = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    align-self: center;
    justify-content: center;
    min-height: calc(100vh - 30px);
`;

export const ContainerWrapperInner = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    align-self: center;
    justify-content: center;
    max-width: ${theme.maxContentWidth};
    margin-top: ${theme.headerHeight};
`;

export const VersionNumber = styled.div`
    color: ${theme.textColor};
`;