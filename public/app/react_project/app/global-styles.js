import { injectGlobal } from 'styled-components';
import { font, color } from './constants/style'
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

    // font ???
    ${fontFace('StemText', 'StemText-Regular', 400, 'normal', ['woff', 'woff2'])}
    ${fontFace('StemText', 'StemText-Bold', 700, 'normal', ['woff', 'woff2'])}

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
    a {
        color: ${color.primary};
        font-weight: 400;
    }

    .icon {
        display: inline-block;
        vertical-align: middle;
    }

    .ReactModal__Body--open {
        overflow: hidden;
    }

    .ReactModal__Content {
        right: -100% !important;
        left: 100% !important;
        transition: all .2s ease-in-out;

        &--after-open {
            right: 0px !important;
            left: 0px !important;
        }

        &--before-close {
            right: 0px !important;
            left: 0px !important;
        }
    }

`;
