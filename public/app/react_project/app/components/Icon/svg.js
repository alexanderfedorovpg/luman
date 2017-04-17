import React from 'react'
import styled from 'styled-components'

import spriteSvg from './img/svg-symbols68uwdhftu0zqimxtj4i.svg'

const Svg = styled.svg`
    display: inline-block;
    vertical-align: middle;

    fill: currentColor;
`

export const ArrowRight = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="14" height="12">
            <path d="M8.7 11.14a.82.82 0 0 1-1.18 0 .89.89 0 0 1-.25-.62c0-.22.08-.44.25-.61l2.91-3.04H1.54a.86.86 0 0 1-.84-.88c0-.48.37-.87.84-.87h8.9L7.51 2.08a.9.9 0 0 1 0-1.24.81.81 0 0 1 1.18 0l4.35 4.54a.9.9 0 0 1 0 1.23z"/>
        </Svg>
    )
}

export const ArrowRightLight = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="14" height="12">
            <path d="M8.7 11.14a.81.81 0 0 1-1.18 0 .89.89 0 0 1-.25-.62c0-.22.08-.44.25-.61l2.91-3.04H1.54a.86.86 0 0 1-.84-.88c0-.48.38-.87.84-.87h8.9L7.51 2.08a.9.9 0 0 1 0-1.24.81.81 0 0 1 1.19 0l4.34 4.54a.9.9 0 0 1 0 1.23z"/><path fill="#fff" d="M8.7 11.14a.81.81 0 0 1-1.18 0 .89.89 0 0 1-.25-.62c0-.22.08-.44.25-.61l2.91-3.04H1.54a.86.86 0 0 1-.84-.88c0-.48.38-.87.84-.87h8.9L7.51 2.08a.9.9 0 0 1 0-1.24.81.81 0 0 1 1.19 0l4.34 4.54a.9.9 0 0 1 0 1.23z"/>
        </Svg>
    )
}

export const ArrowLeft = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="14" height="12">
            <path d="M5.3 11.14c.32.35.85.35 1.18 0 .17-.17.25-.39.25-.62a.89.89 0 0 0-.25-.61L3.57 6.87h8.89c.46 0 .84-.4.84-.88a.86.86 0 0 0-.84-.87h-8.9l2.92-3.04a.9.9 0 0 0 0-1.24.81.81 0 0 0-1.18 0L.95 5.38a.9.9 0 0 0 0 1.23z"/>
        </Svg>
    )
}

export const Hamburger = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="15">
            <use xlinkHref={`${spriteSvg}#hamburger`} />
        </Svg>
    )
}

const LogoutSvg = styled.svg`
    opacity: 0.59;
    &:hover {
        opacity: 1;
    }
`

export const Logout = (props) => {
    return (
        <LogoutSvg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="18">
            <path d="M8.53.98a8.3 8.3 0 0 1 7.34 4.46l-1.28.62a6.75 6.75 0 0 0-6.06-3.68A6.7 6.7 0 0 0 1.76 9a6.7 6.7 0 0 0 6.77 6.62 6.75 6.75 0 0 0 6.06-3.68l1.28.62a8.3 8.3 0 0 1-7.34 4.45C4 17.02.33 13.43.33 9A8.12 8.12 0 0 1 8.54.98zm0 8.72V8.3h12.4L19.3 6.7l1.01-.98L23.66 9l-3.35 3.28-1-.98 1.63-1.6z"/><path fill="#fff" d="M8.53.98a8.3 8.3 0 0 1 7.34 4.46l-1.28.62a6.75 6.75 0 0 0-6.06-3.68A6.7 6.7 0 0 0 1.76 9a6.7 6.7 0 0 0 6.77 6.62 6.75 6.75 0 0 0 6.06-3.68l1.28.62a8.3 8.3 0 0 1-7.34 4.45C4 17.02.33 13.43.33 9A8.12 8.12 0 0 1 8.54.98zm0 8.72V8.3h12.4L19.3 6.7l1.01-.98L23.66 9l-3.35 3.28-1-.98 1.63-1.6z"/>
        </LogoutSvg>
    )
}

export const Search = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="17" height="17">
            <use xlinkHref={`${spriteSvg}#search`} />
        </Svg>
    )
}

export const Clip = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="18">
            <use xlinkHref={`${spriteSvg}#clip`} />
        </Svg>
    )
}

export const Calendar = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="17">
            <path d="M5 9V7h2v2zm3 0V7h2v2zm4 0V7h1v2zm-7 3v-1h2v1zm3 0v-1h2v1zm4 0v-1h1v1zm5.46-9.9v14.5H.66V2.1h2.52V.4h1.68v1.7h1.68V.4h1.68v1.7H9.9V.4h1.68v1.7h1.68V.4h1.68v1.7zm-1.68 1.71h-.84v.85h-1.68v-.85h-1.68v.85H9.9v-.85H8.22v.85H6.54v-.85H4.86v.85H3.18v-.85h-.84V14.9h13.44z"/>
            <path fill="#666" d="M5 9V7h2v2zm3 0V7h2v2zm4 0V7h1v2zm-7 3v-1h2v1zm3 0v-1h2v1zm4 0v-1h1v1zm5.46-9.9v14.5H.66V2.1h2.52V.4h1.68v1.7h1.68V.4h1.68v1.7H9.9V.4h1.68v1.7h1.68V.4h1.68v1.7zm-1.68 1.71h-.84v.85h-1.68v-.85h-1.68v.85H9.9v-.85H8.22v.85H6.54v-.85H4.86v.85H3.18v-.85h-.84V14.9h13.44z"/>
        </Svg>
    )
}

export const File = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="18">
            <path d="M4.34 18c-.9 0-1.75-.36-2.38-1.02a3.54 3.54 0 0 1 0-4.9L12.39 1.33a4.38 4.38 0 0 1 6.3 0A4.59 4.59 0 0 1 20 4.58c0 1.22-.46 2.37-1.3 3.24l-8.22 8.45a.62.62 0 0 1-.89 0 .66.66 0 0 1 0-.92L17.8 6.9a3.33 3.33 0 0 0 0-4.64 3.12 3.12 0 0 0-4.51 0L2.85 12.99a2.23 2.23 0 0 0 0 3.07c.8.82 2.19.82 2.99 0l7.01-7.2a1.08 1.08 0 0 0 0-1.49 1 1 0 0 0-1.45 0L6.61 12.3a.61.61 0 0 1-.89 0 .68.68 0 0 1 0-.92l4.79-4.92a2.24 2.24 0 0 1 3.23 0 2.38 2.38 0 0 1 0 3.33l-7.01 7.2A3.3 3.3 0 0 1 4.34 18z"/>
        </Svg>
    )
}

export default {
    ArrowLeft,
    ArrowRight,
    ArrowRightLight,
    Hamburger,
    Logout,
    Search,
    Clip,
    Calendar,
    File
}
