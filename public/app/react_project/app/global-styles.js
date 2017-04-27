import { injectGlobal } from 'styled-components';
import { font } from './constants/style'
import fontFace from './fonts'

/* eslint no-unused-expressions: 0 */
injectGlobal`
    ${fontFace('Open Sans', 'hinted-OpenSans', 400, 'normal', ['woff', 'woff2'])}
    ${fontFace('Open Sans', 'hinted-OpenSans-Light', 300, 'normal', ['woff', 'woff2'])}
    ${fontFace('Open Sans', 'hinted-OpenSans-Semibold', 600, 'normal', ['woff', 'woff2'])}
    ${fontFace('Open Sans', 'hinted-OpenSans-Bold', 700, 'normal', ['woff', 'woff2'])}

    // font Helvetice Neue
    ${fontFace('HelveticaNeue', 'hinted-HelveticaNeueCyr-Medium', 400, 'normal', ['woff', 'woff2'])}
    ${fontFace('HelveticaNeue', 'hinted-HelveticaNeueCyr-Light', 300, 'normal', ['woff', 'woff2'])}
    ${fontFace('HelveticaNeue', 'hinted-HelveticaNeueCyr-Bold', 700, 'normal', ['woff', 'woff2'])}

    // font Nexa without Cyrillic
    ${fontFace('Nexa', 'hinted-HelveticaNeueCyr-Bold', 700, 'normal', ['woff', 'woff2'])}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html, body {
        width: 100%;
        height: 100%;

        font-family: ${font.opensans};
        font-size: 16px;
        font-weight: 400;
        color: #333;
    }

    body {
        margin: 0;

        overflow-x: hidden;
    }

    .icon {
        display: inline-block;
        vertical-align: middle;
    }

    .ReactModal__Body--open {
        overflow: hidden;
    }
`;
