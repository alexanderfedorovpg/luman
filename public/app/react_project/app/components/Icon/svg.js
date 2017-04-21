import React from 'react';
import styled, { css } from 'styled-components';

import spriteSvg from './img/svg-symbols68uwdhftu0zqimxtj4i.svg';

const Svg = styled.svg`
    display: inline-block;

    vertical-align: middle;

    fill: currentColor;
`;

export const ArrowRight = (props) => (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="14" height="12">
        <path d="M8.7 11.14a.82.82 0 0 1-1.18 0 .89.89 0 0 1-.25-.62c0-.22.08-.44.25-.61l2.91-3.04H1.54a.86.86 0 0 1-.84-.88c0-.48.37-.87.84-.87h8.9L7.51 2.08a.9.9 0 0 1 0-1.24.81.81 0 0 1 1.18 0l4.35 4.54a.9.9 0 0 1 0 1.23z" />
    </Svg>
);

export const ArrowRightLight = (props) => (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="14" height="12">
        <path d="M8.7 11.14a.81.81 0 0 1-1.18 0 .89.89 0 0 1-.25-.62c0-.22.08-.44.25-.61l2.91-3.04H1.54a.86.86 0 0 1-.84-.88c0-.48.38-.87.84-.87h8.9L7.51 2.08a.9.9 0 0 1 0-1.24.81.81 0 0 1 1.19 0l4.34 4.54a.9.9 0 0 1 0 1.23z" />
        <path fill="#fff" d="M8.7 11.14a.81.81 0 0 1-1.18 0 .89.89 0 0 1-.25-.62c0-.22.08-.44.25-.61l2.91-3.04H1.54a.86.86 0 0 1-.84-.88c0-.48.38-.87.84-.87h8.9L7.51 2.08a.9.9 0 0 1 0-1.24.81.81 0 0 1 1.19 0l4.34 4.54a.9.9 0 0 1 0 1.23z" />
    </Svg>
);

export const ArrowLeft = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" {...props}>
        <path d="M5.3 11.14c.32.35.85.35 1.18 0 .17-.17.25-.39.25-.62a.89.89 0 0 0-.25-.61L3.57 6.87h8.89c.46 0 .84-.4.84-.88a.86.86 0 0 0-.84-.87h-8.9l2.92-3.04a.9.9 0 0 0 0-1.24.81.81 0 0 0-1.18 0L.95 5.38a.9.9 0 0 0 0 1.23z" />
    </Svg>
);

export const ArrowDown = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="" viewBox="0 0 10.812 12.594" {...props}>
        <path fillRule="evenodd" d="M10.534 8a.815.815 0 0 0 0-1.187.9.9 0 0 0-1.238 0L6.258 9.73V.836a.877.877 0 0 0-1.753 0V9.73L1.472 6.812a.9.9 0 0 0-1.237 0A.815.815 0 0 0 .235 8l4.53 4.35a.9.9 0 0 0 .62.246.883.883 0 0 0 .618-.247z" />
    </Svg>
);

export const ArrowUp = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.82 12.594" {...props}>
        <path fillRule="evenodd" d="M10.54 4.592a.82.82 0 0 1 0 1.188.9.9 0 0 1-.62.247.88.88 0 0 1-.62-.247L6.26 2.864v8.892a.876.876 0 0 1-1.75 0V2.864L1.48 5.78a.9.9 0 0 1-1.24 0 .82.82 0 0 1 0-1.188L4.77.244a.9.9 0 0 1 1.24 0z"/>
    </Svg>
);

export const Hamburger = (props) => (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="15">
        <use xlinkHref={`${spriteSvg}#hamburger`} />
    </Svg>
);

const LogoutSvg = styled.svg`
    opacity: 0.59;
    &:hover {
        opacity: 1;
    }
`;

export const Logout = (props) => (
    <LogoutSvg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="18">
        <path d="M8.53.98a8.3 8.3 0 0 1 7.34 4.46l-1.28.62a6.75 6.75 0 0 0-6.06-3.68A6.7 6.7 0 0 0 1.76 9a6.7 6.7 0 0 0 6.77 6.62 6.75 6.75 0 0 0 6.06-3.68l1.28.62a8.3 8.3 0 0 1-7.34 4.45C4 17.02.33 13.43.33 9A8.12 8.12 0 0 1 8.54.98zm0 8.72V8.3h12.4L19.3 6.7l1.01-.98L23.66 9l-3.35 3.28-1-.98 1.63-1.6z" />
        <path fill="#fff" d="M8.53.98a8.3 8.3 0 0 1 7.34 4.46l-1.28.62a6.75 6.75 0 0 0-6.06-3.68A6.7 6.7 0 0 0 1.76 9a6.7 6.7 0 0 0 6.77 6.62 6.75 6.75 0 0 0 6.06-3.68l1.28.62a8.3 8.3 0 0 1-7.34 4.45C4 17.02.33 13.43.33 9A8.12 8.12 0 0 1 8.54.98zm0 8.72V8.3h12.4L19.3 6.7l1.01-.98L23.66 9l-3.35 3.28-1-.98 1.63-1.6z" />
    </LogoutSvg>
);

export const Search = (props) => (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="17" height="17">
        <use xlinkHref={`${spriteSvg}#search`} />
    </Svg>
);

export const Clip = (props) => (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="18">
        <use xlinkHref={`${spriteSvg}#clip`} />
    </Svg>
);

export const Calendar = (props) => (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="17">
        <path d="M5 9V7h2v2zm3 0V7h2v2zm4 0V7h1v2zm-7 3v-1h2v1zm3 0v-1h2v1zm4 0v-1h1v1zm5.46-9.9v14.5H.66V2.1h2.52V.4h1.68v1.7h1.68V.4h1.68v1.7H9.9V.4h1.68v1.7h1.68V.4h1.68v1.7zm-1.68 1.71h-.84v.85h-1.68v-.85h-1.68v.85H9.9v-.85H8.22v.85H6.54v-.85H4.86v.85H3.18v-.85h-.84V14.9h13.44z" />
        <path fill="#666" d="M5 9V7h2v2zm3 0V7h2v2zm4 0V7h1v2zm-7 3v-1h2v1zm3 0v-1h2v1zm4 0v-1h1v1zm5.46-9.9v14.5H.66V2.1h2.52V.4h1.68v1.7h1.68V.4h1.68v1.7H9.9V.4h1.68v1.7h1.68V.4h1.68v1.7zm-1.68 1.71h-.84v.85h-1.68v-.85h-1.68v.85H9.9v-.85H8.22v.85H6.54v-.85H4.86v.85H3.18v-.85h-.84V14.9h13.44z" />
    </Svg>
);

export const File = (props) => (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="18">
        <path d="M4.34 18c-.9 0-1.75-.36-2.38-1.02a3.54 3.54 0 0 1 0-4.9L12.39 1.33a4.38 4.38 0 0 1 6.3 0A4.59 4.59 0 0 1 20 4.58c0 1.22-.46 2.37-1.3 3.24l-8.22 8.45a.62.62 0 0 1-.89 0 .66.66 0 0 1 0-.92L17.8 6.9a3.33 3.33 0 0 0 0-4.64 3.12 3.12 0 0 0-4.51 0L2.85 12.99a2.23 2.23 0 0 0 0 3.07c.8.82 2.19.82 2.99 0l7.01-7.2a1.08 1.08 0 0 0 0-1.49 1 1 0 0 0-1.45 0L6.61 12.3a.61.61 0 0 1-.89 0 .68.68 0 0 1 0-.92l4.79-4.92a2.24 2.24 0 0 1 3.23 0 2.38 2.38 0 0 1 0 3.33l-7.01 7.2A3.3 3.3 0 0 1 4.34 18z" />
    </Svg>
);

export const Dynamic = (props) => (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12">
        <path d="M18.19.6c-1.28 0-2.1 1.5-1.51 2.73l-3.4 4.43a1.56 1.56 0 0 0-1.1 0L8.79 3.34C9.39 2.1 8.57.6 7.28.6c-1.27 0-2.1 1.48-1.51 2.73L2.36 7.76C1.25 7.34.1 8.26.1 9.53c0 1.03.77 1.87 1.71 1.87 1.28 0 2.1-1.5 1.51-2.74l3.4-4.43c.35.13.73.14 1.1.01l3.39 4.4c-.6 1.25.22 2.76 1.51 2.76 1.27 0 2.1-1.49 1.51-2.73l3.41-4.43c1.11.41 2.26-.5 2.26-1.77 0-1.03-.77-1.87-1.71-1.87z" />
    </Svg>
);

export const YoutubePlayBtn = (props) => (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 40 32">
        <path fill="#c00" fillRule="evenodd" d="M235 460.8c-1.2-.4-8.6-.8-16-.8s-14.8.4-16 .8c-3.2 1-4 8-4 15.2s.8 14.2 4 15.2c1.2.4 8.6.8 16 .8s14.8-.4 16-.8c3.2-1 4-8 4-15.2s-.8-14.2-4-15.2zM215 485v-18l12 9z" transform="translate(-199 -460)" />
    </Svg>
);

export const Check = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" {...props}>
        <path d="M26.109 8.844c0 0.391-0.156 0.781-0.438 1.062l-13.438 13.438c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-7.781-7.781c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l2.125-2.125c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l4.594 4.609 10.25-10.266c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l2.125 2.125c0.281 0.281 0.438 0.672 0.438 1.062z" />
    </Svg>
);

export const Close = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
        <path d="M19 4q0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-6.297 6.289 6.297 6.289q0.289 0.289 0.289 0.711 0 0.43-0.285 0.715t-0.715 0.285q-0.422 0-0.711-0.289l-6.289-6.297-6.289 6.297q-0.289 0.289-0.711 0.289-0.43 0-0.715-0.285t-0.285-0.715q0-0.422 0.289-0.711l6.297-6.289-6.297-6.289q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l6.289 6.297 6.289-6.297q0.289-0.289 0.711-0.289z" />
    </Svg>
);

export default {
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowRightLight,
    Hamburger,
    Logout,
    Search,
    Clip,
    Calendar,
    File,
    Dynamic,
    YoutubePlayBtn,
    Check,
    Close,
};
