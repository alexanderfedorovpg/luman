import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router';

import Icon from 'components/Icon';
import Badge from 'components/Badge';

import { ifProp } from 'utils/style';
import { padding, font } from 'constants/style';
import { items } from './constants';

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
const NavItem = styled(({expanded, active, ...rest}) => <Link {...rest} />)`
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
`;


function NavSide({ expanded, isActive, location }) {
    function renderItem(item) {
        return (
            <NavItem
                key={item.link}
                to={item.link}
                expanded={expanded}
                active={isActive(item.link)}
            >
                <Icon type={item.icon} active={isActive(item.link)} />
                <Name expanded={expanded}>
                    {item.name}
                </Name>
            </NavItem>
        );
    }

    return (
        <Wrapper expanded={expanded} onClick={(e) => e.stopPropagation()}>
            <NavItem href="#">
                {expanded
                    ? <Icon type="logo-light" />
                    : <Icon type="logo" />
                }
            </NavItem>
            {items.map(renderItem)}
        </Wrapper>
    )
}

export default NavSide
