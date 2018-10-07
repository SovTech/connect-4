import theme from '../../theme';
import styled from 'styled-components';

export const PlayerDiv = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: ${theme.smallFontSize};
`;

export const PlayersDiv = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const CardInner = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

export const TeamDiv = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const TeamsContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    padding-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const ScoreButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    color: ${theme.inverseTextColor};
    font-size: ${theme.h1Size};
    margin: 0;
`;

export const ScoreText = styled.h1`
    color: ${theme.inverseTextColor};
    font-size: ${theme.h1Size};
    margin: 0;
`;

export const ColorText = styled.h4`
    color: ${theme.inverseTextColor};
    font-size: ${theme.h4Size};
    margin: 0;
`;
