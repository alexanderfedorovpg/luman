import React from 'react'
import styled, { css } from 'styled-components'

import Icon from '../Icon'
import Badge from '../Badge'

import { ifProp } from './../../utils/style'
import { padding, font } from './../../constants/style'

const Wrapper = styled.nav`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 12;

    width: 67px;

    background-color: #000000;

    transition: all 0.4s ease;

    ${ifProp('expanded')`
        width: 251px;
    `}
`
const NavItem = styled.a`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;

    text-decoration: none;

    border-bottom: 1px solid #000;

    background-color: #181818;

    &:last-child {
        border-color: transparent;
    }

    &:hover {
        background-color: #2e2e2e;
    }

    ${ifProp('active')`
        background-color: #2e2e2e;
    `}

    ${ifProp('expanded')(css`
        justify-content: flex-start;
        padding-left: ${padding};
    `)}

`

const Name = styled.span`
    display: none;

    font-family: ${font.opensans};
    font-size: 13px;
    font-weight: 400;
    color: #999999;
    text-transform: uppercase;

    ${ifProp('expanded')`
        margin-left: 13px;
        display: block;
    `}
`

const NavBadge = styled(Badge)`
    position: absolute;
    top: 10px;
    right: 13px;

    ${ifProp('expanded')(css`
        top: 14px;
        right: 22px;
    `)}
`

function NavSide({ expanded }) {

    return (
        <Wrapper expanded={expanded} onClick={e => e.stopPropagation()}>
            <NavItem href="#">
                {expanded
                    ? <Icon type="logo-light" />
                    : <Icon type="logo" />
                }

            </NavItem>
            <NavItem href="#" expanded={expanded}>
                <Icon type="feed" active />
                <Name expanded={expanded}>
                    Лента
                </Name>
            </NavItem>
            <NavItem href="#" expanded={expanded}>
                <Icon type="view" />
                <Name expanded={expanded}>
                    Задания
                </Name>
            </NavItem>
            <NavItem href="#" expanded={expanded}>
                <Icon type="draft" />
                <Name expanded={expanded}>
                    В работе
                </Name>
            </NavItem>
            <NavItem href="#" expanded={expanded}>
                <Icon type="ready" />
                <Name expanded={expanded}>
                    Готово
                </Name>
                <NavBadge success expanded={expanded}>8</NavBadge>
            </NavItem>
            <NavItem href="#" expanded={expanded}>
                <Icon type="main" />
                <Name expanded={expanded}>
                    Главная страница
                </Name>
            </NavItem>
            <NavItem href="#" expanded={expanded}>
                <Icon type="tv" />
                <Name expanded={expanded}>
                    Программы
                </Name>
                <NavBadge success expanded={expanded}>2</NavBadge>
            </NavItem>
            <NavItem href="#" expanded={expanded}>
                <Icon type="live" />
                <Name expanded={expanded}>
                    Прямой эфир
                </Name>
                <NavBadge danger expanded={expanded}>off</NavBadge>
            </NavItem>
        </Wrapper>
    )
}

export default NavSide
