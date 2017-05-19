import React, { Component } from 'react'
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router';

import Tumbler from './Tumbler';

import { padding } from 'constants/style'
import { below, rem, ifProp } from 'utils/style'

const Root = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: ${rem(19)};
    padding-right: ${rem(16)};

    ${below('1100px')(css`
        margin-left: rem(-18);
    `)}
`

const Left = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: 1px;
`

const Nav = styled.div`
    margin-left: ${rem(9)};

    .war-mode & {
        color: #c00;
    }
`;

const NavItem = styled(({active, war, ...rest}) => <Link {...rest} />)`
    margin-right: ${rem(21)};

    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    color: #ccc;
    text-decoration: none;
    text-transform: uppercase;
    span {
        font-weight: 400;
    }
    &:hover {
        color: #000;
        span {
            color: #666;
        }
    }
    &:last-child {
        margin-right: 0;
    }

    ${ifProp('active')`
        color: #000;
        span {
            color: #666;
        }
    `}

    ${ifProp(['war', 'active'])`
        color: #c00;
        span {
            color: #c00;
        }
    `}
`;

const Summary = styled.span`
    font-size: 14px;
    font-weight: 400;
    color: #000;
`

class Header extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        let { data, router, war, onWarModeChange } = this.props

        const warCount = (data.war||[]).length
        const newsCount = (data.news||[]).length
        const noiseCount = (data.noise||[]).length
        const broadcastCount = (data.broadcast||[]).length

        const total = warCount + newsCount + noiseCount + broadcastCount

        return (
            <Root>
                <Left>
                    <Tumbler war={war} onWarModeChange={onWarModeChange} />
                    <Nav>
                        {war
                            ? (
                                <NavItem
                                    to="/constructor/war"
                                    active={router.isActive('/constructor/war')}
                                    war>

                                    Война <span>{warCount}</span>
                                </NavItem>
                            )
                            : null
                        }
                        <NavItem
                            to="/constructor/news"
                            active={router.isActive('/constructor/news')}>

                            Новости <span>{newsCount}</span>
                        </NavItem>
                        <NavItem
                            to="/constructor/noise"
                            active={router.isActive('/constructor/noise')}>

                            Инфошум <span>{noiseCount}</span>
                        </NavItem>
                        <NavItem
                            to="/constructor/broadcast"
                            active={router.isActive('/constructor/broadcast')}>

                            Из эфира <span>{broadcastCount}</span>
                        </NavItem>
                    </Nav>
                </Left>
                <div>
                    <Summary>
                        Итого: {total}
                    </Summary>
                </div>
            </Root>
        )
    }
}

export default withRouter(Header);
