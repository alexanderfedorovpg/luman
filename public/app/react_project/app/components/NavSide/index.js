import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router';

import Icon from 'components/Icon';
import Badge from 'components/Badge';
import withPermissions from 'HOC/withPermissions';

import { ifProp } from 'utils/style';
import { padding, font } from 'constants/style';
import { items } from './constants';
import logoMin from './assets/logo-min.png';
import logo from './assets/logo.png';

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
    color: #999999;

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
        color: #fff;
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
    transition: all .3s;

    ${ifProp('expanded')(css`
        top: 22px;
        right: 22px;
    `)}
`;

function NavSide({ expanded, isActive, location, checkPermissions }) {
    function renderItem(item) {
        const { permissions } = item;

        if (permissions && !checkPermissions(permissions, false)) {
            return null;
        }

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
            <NavItem expanded={expanded} href="#">
                {expanded
                    ? <img src={logo} alt="rtvi" />
                    : <img src={logoMin} alt="rtvi" />
                }
            </NavItem>
            {items.map(renderItem)}

            {/* пока нет иконки активной, иначе ошибки сыпятся*/}
            <NavItem
                to={'/translation'}
                expanded={expanded}
                active={isActive('/translation')}
            >
                <Icon type="text-edit-ico" />
                <Name expanded={expanded}>
                    Трансляция
                </Name>
                <NavBadge expanded={expanded} success>
                    8
                </NavBadge>
            </NavItem>
        </Wrapper>
    )
}

export default withPermissions(NavSide);
