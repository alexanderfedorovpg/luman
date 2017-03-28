import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html, body {
        height: 100%;

        font-family: 'Open Sans', Arial, sans-serif;
        font-size: 16px;
        font-weight: 400;
        color: #999;
    }

    body {
        margin: 0;
    }

    #app {
        height: 100%
    }


    .icon {
        display: inline-block;
        vertical-align: middle;
    }
`;
