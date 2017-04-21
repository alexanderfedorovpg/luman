import React from 'react';
import styled from 'styled-components';
import { Link as ReactLink } from 'react-router';

import Icon from './../Icon';
import User, { Name as UserName } from './../User';
import { rem, ifProp } from './../../utils/style';
import { padding, font } from './../../constants/style';

const Wrapper = styled.header`
    position: fixed;
    z-index: 9;
    top: 0;
    right: 0;
    left: 0;
    padding-left: 67px;

    height: 60px;

    transition: all 0.4s ease;

    ${ifProp('moved')`
        right: -180px;
        left: 180px;
    `}
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding-right: ${padding};
    padding-left: ${padding};

    background-color: #131e27;
`;

export const Left = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding-right: 2px;
`;

export const Bot = styled.div`
    position: fixed;
    z-index: 9;
    top: 60px;
    right: 0;
    left: 67px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding-right: ${padding};
    padding-left: ${padding};

    background-color: #f0f0f0;

    transition: all 0.4s ease;

    ${ifProp('moved')`
        right: -251px;
        left: 251px;
    `}
`;

const Hamburger = styled.button`
    padding: 0;
    margin-right: ${rem(5)};

    border: 0;
    background: transparent;
    outline: 0;
`;

const Time = styled.time`
    margin-top: 2px;

    font-family: ${font.opensans};
    font-size: ${rem(14)};
    font-weight: 400;

    color: #999999;
    letter-spacing: 0.4px;
    word-spacing: 0.85px;
`;

export const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-left: 2px;
`;

export const Title = styled.h2`
    margin-left: .3rem;

    font-size: 1.5rem;
    line-height: 1.8125rem;
    font-weight: 400;

    letter-spacing: -.02rem;
`;

const Action = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const NavItem = styled(({ active, ...rest }) => <ReactLink {...rest} />)`
    margin-right: ${rem(24)};

    font-family: ${font.helvetica};
    font-size: ${rem(14)};
    font-weight: 400;

    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    &:last-child {
        margin-right: 0;
    }

    ${ifProp('active')`
        color: #fff;
    `}
`;

const Logout = styled.a`
    cursor: pointer;
    color: rgba(0, 0, 0, 0.59);
`;

export const Link = styled.a`
    font-family: ${font.opensans};
    font-size: 13px;
    font-weight: 700;
    color: #000000;
    text-decoration: none;
    text-transform: uppercase;

    span {
        margin-right: 3px;

        font-family: ${font.helvetica};
        font-size: 18px;
    }
`;

const CustomUser = styled(User)`
    margin-right: ${rem(27)};
    margin-left: ${rem(20)};
`;

const CustomUserName = styled(UserName)`
    margin-top: 5px;
    letter-spacing: 0;
    color: #fff;
`;

function Header({ moved, onToggle, isActive, onLogout, user }) {
    return (
        <Wrapper moved={moved}>
            <Top>
                <Left>
                    <div>
                        <Hamburger
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggle();
                            }}
                        >
                            <Icon type="hamburger" />
                        </Hamburger>
                        <Time dateTime="2017-04-02T16:35">5 января 2017 16:35</Time>
                    </div>
                </Left>
                <Right>
                    <Action>
                        <nav>
                            <NavItem to="/stats" active={isActive('/stats')}>
                                Статистика
                            </NavItem>
                            <NavItem to="#" active={false}>
                                Аналитика
                            </NavItem>
                        </nav>
                        <CustomUser data={user}>
                            <CustomUserName href="#">
                                {user.name}
                            </CustomUserName>
                        </CustomUser>
                        <Logout onClick={onLogout}>
                            <Icon type="logout" />
                        </Logout>
                    </Action>
                </Right>
            </Top>
        </Wrapper>
    );
}

export default Header;
