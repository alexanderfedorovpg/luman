import React from 'react'
import styled, { css } from 'styled-components'
import { ifProp } from './../../utils/style'
import sprite from './img/96dpi/spritem0tpnpb2ho6g7yn6zuxr.png'

const Svg = styled.svg`
    display: inline-block;
    vertical-align: middle;
`

export const ArrowRight = (props) => {
    return (
        <svg {...props} className="icon" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12">
            <path d="M8.7 11.14a.82.82 0 0 1-1.18 0 .89.89 0 0 1-.25-.62c0-.22.08-.44.25-.61l2.91-3.04H1.54a.86.86 0 0 1-.84-.88c0-.48.37-.87.84-.87h8.9L7.51 2.08a.9.9 0 0 1 0-1.24.81.81 0 0 1 1.18 0l4.35 4.54a.9.9 0 0 1 0 1.23z"/>
        </svg>
    )
}

export const ArrowRightLight = (props) => {
    return (
        <svg {...props} className="icon" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12">
            <path d="M8.7 11.14a.81.81 0 0 1-1.18 0 .89.89 0 0 1-.25-.62c0-.22.08-.44.25-.61l2.91-3.04H1.54a.86.86 0 0 1-.84-.88c0-.48.38-.87.84-.87h8.9L7.51 2.08a.9.9 0 0 1 0-1.24.81.81 0 0 1 1.19 0l4.34 4.54a.9.9 0 0 1 0 1.23z"/><path fill="#fff" d="M8.7 11.14a.81.81 0 0 1-1.18 0 .89.89 0 0 1-.25-.62c0-.22.08-.44.25-.61l2.91-3.04H1.54a.86.86 0 0 1-.84-.88c0-.48.38-.87.84-.87h8.9L7.51 2.08a.9.9 0 0 1 0-1.24.81.81 0 0 1 1.19 0l4.34 4.54a.9.9 0 0 1 0 1.23z"/>
        </svg>
    )
}

export const Hamburger = (props) => {
    return (
        <svg {...props} className="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15">
            <path d="M1.51 2.34h14.98c.34 0 .6-.36.6-.8 0-.43-.26-.79-.6-.79H1.5c-.34 0-.61.36-.61.8 0 .43.27.79.61.79zm0 5.95h14.98c.34 0 .6-.35.6-.79 0-.44-.26-.8-.6-.8H1.5c-.34 0-.61.36-.61.8 0 .44.27.8.61.8zm0 5.96h14.98c.34 0 .6-.36.6-.8 0-.43-.26-.79-.6-.79H1.5c-.34 0-.61.36-.61.8 0 .43.27.79.61.79z"/><path fill="#fff" d="M1.51 2.34h14.98c.34 0 .6-.36.6-.8 0-.43-.26-.79-.6-.79H1.5c-.34 0-.61.36-.61.8 0 .43.27.79.61.79zm0 5.95h14.98c.34 0 .6-.35.6-.79 0-.44-.26-.8-.6-.8H1.5c-.34 0-.61.36-.61.8 0 .44.27.8.61.8zm0 5.96h14.98c.34 0 .6-.36.6-.8 0-.43-.26-.79-.6-.79H1.5c-.34 0-.61.36-.61.8 0 .43.27.79.61.79z"/>
        </svg>
    )
}

const LogoutWrapper = styled.svg`
    opacity: 0.59;
    &:hover {
        opacity: 1;
    }
`

export const Logout = (props) => {
    return (
        <LogoutWrapper {...props} className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18">
            <path d="M8.53.98a8.3 8.3 0 0 1 7.34 4.46l-1.28.62a6.75 6.75 0 0 0-6.06-3.68A6.7 6.7 0 0 0 1.76 9a6.7 6.7 0 0 0 6.77 6.62 6.75 6.75 0 0 0 6.06-3.68l1.28.62a8.3 8.3 0 0 1-7.34 4.45C4 17.02.33 13.43.33 9A8.12 8.12 0 0 1 8.54.98zm0 8.72V8.3h12.4L19.3 6.7l1.01-.98L23.66 9l-3.35 3.28-1-.98 1.63-1.6z"/><path fill="#fff" d="M8.53.98a8.3 8.3 0 0 1 7.34 4.46l-1.28.62a6.75 6.75 0 0 0-6.06-3.68A6.7 6.7 0 0 0 1.76 9a6.7 6.7 0 0 0 6.77 6.62 6.75 6.75 0 0 0 6.06-3.68l1.28.62a8.3 8.3 0 0 1-7.34 4.45C4 17.02.33 13.43.33 9A8.12 8.12 0 0 1 8.54.98zm0 8.72V8.3h12.4L19.3 6.7l1.01-.98L23.66 9l-3.35 3.28-1-.98 1.63-1.6z"/>
        </LogoutWrapper>
    )
}

export const Search = (props) => {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
            <path d="M16.67 15.48l-3.92-4.2c1-1.24 1.56-2.8 1.56-4.42A6.77 6.77 0 0 0 7.65 0 6.77 6.77 0 0 0 1 6.86a6.77 6.77 0 0 0 6.65 6.87c1.38 0 2.7-.43 3.82-1.24l3.95 4.24a.85.85 0 0 0 1.23.02.92.92 0 0 0 .02-1.27zM7.65 1.8a5 5 0 0 1 4.92 5.07 5 5 0 0 1-4.92 5.08 5 5 0 0 1-4.92-5.08A5 5 0 0 1 7.65 1.8z"/><path fill="#999" d="M16.67 15.48l-3.92-4.2c1-1.24 1.56-2.8 1.56-4.42A6.77 6.77 0 0 0 7.65 0 6.77 6.77 0 0 0 1 6.86a6.77 6.77 0 0 0 6.65 6.87c1.38 0 2.7-.43 3.82-1.24l3.95 4.24a.85.85 0 0 0 1.23.02.92.92 0 0 0 .02-1.27zM7.65 1.8a5 5 0 0 1 4.92 5.07 5 5 0 0 1-4.92 5.08 5 5 0 0 1-4.92-5.08A5 5 0 0 1 7.65 1.8z"/>
        </Svg>
    )
}

export default styled.i`
    display: inline-block;
    vertical-align: middle;

    background-image: url(${sprite});
    background-size: 149px, 124px;
    background-repeat: no-repeat;

    ${ifProp('dropdown')`
        background-position: -133px -62px;
        width: 13px;
        height: 8px;
    `}

    ${ifProp('okay')`
        background-position: -133px -50px;
        width: 14px;
        height: 8px;
    `}

    ${ifProp('delete')`
        background-position: -133px -35px;
        width: 11px;
        height: 11px;

        &:hover {
            background-position: -133px -20px;
        }
    `}

    ${ifProp('deleteReverse')`
        background-position: -133px -20px;
        width: 11px;
        height: 11px;
    `}

    ${ifProp('doRight')`
        background-position: -50px -82px;
        width: 21px;
        height: 21px;

        &:hover {
            background-position: -25px -82px;
        }
    `}

    ${ifProp('logo')`
        background-position: 0px 0px;
        width: 25px;
        height: 25px;
    `}

    ${ifProp('feed')`
        background-position: -83px -26px;
        width: 21px;
        height: 22px;
    `}

    ${ifProp('view')`
        background-position: -52px -29px;
        width: 22px;
        height: 22px;
    `}

    ${ifProp('draft')`
        background-position: 0px -82px;
        width: 21px;
        height: 22px;
    `}

    ${ifProp('ready')`
        background-position: -51px -56px;
        width: 21px;
        height: 22px;
    `}

    ${ifProp('main')`
        background-position: -75px -82px;
        width: 21px;
        height: 21px;
    `}

    ${ifProp('tv')`
        background-position: -29px 0px;
        width: 23px;
        height: 24px;
    `}

    ${ifProp('live')`
        background-position: 0px -29px;
        width: 22px;
        height: 23px;
    `}

    ${ifProp('tass')`
        background-position: -80px -108px;
        width: 16px;
        height: 16px;
    `}

    ${ifProp(['active', 'feed'])`
        background-position: -83px 0px;
    `}

    ${ifProp(['active', 'view'])`
        background-position: 0px -56px;
    `}

    ${ifProp(['active', 'draft'])`
        background-position: -26px -56px;
    `}

    ${ifProp(['active', 'ready'])`
        background-position: -83px -52px;
    `}

    ${ifProp(['active', 'main'])`
        background-position: -108px 0px;
    `}

    ${ifProp(['active', 'tv'])`
        background-position: -56px 0px;
    `}

    ${ifProp(['active', 'live'])`
        background-position: -26px -29px;
    `}

`
