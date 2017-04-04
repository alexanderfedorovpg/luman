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

export default {
    ArrowRight,
    ArrowRightLight,
    Hamburger,
    Logout,
    Search,
    Clip
}
