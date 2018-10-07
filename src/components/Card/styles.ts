import theme from '../../theme';
import styled from 'styled-components';

export const CardWrapper = styled.div`
    background: #fff;
    border: 1px solid ${theme.overlayColor};
    border-radius: ${theme.borderRadius};
    box-shadow: 0 1px 2px 0 ${theme.overlayColor};
    margin: ${theme.marginHalf};
    max-width: 100%;
    min-width: 300px;
`;

export const CardInner = styled.div`
    height: 100%;
`;

export const PaddedContent = styled.div`
    padding: ${theme.marginHalf};
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: ${theme.inverseTextColor};
    border-bottom: 1px solid ${theme.overlayColor};
    padding: 10px 20px;
    border-top-left-radius: ${theme.borderRadius};
    border-top-right-radius: ${theme.borderRadius};

    * {
      margin: 0;
    }
`;