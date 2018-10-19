import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
import { IS_TEST } from './constants';
import theme from './theme';

export const GlobalStyle = createGlobalStyle`
    ${styledNormalize}
 
    html {
        margin: 0;
        font-family: sans-serif;
        overflow-x: hidden;
        min-height: 100vh;
    }
    
    body {
        padding: 15px;
        background-color: ${IS_TEST ? theme.testBackgroundColorDarker20 : theme.baseColor}
    }
    
    a {
        color: initial;
        text-decoration: none;
    }
    
    a:active {
        color: initial;
    }
`;
