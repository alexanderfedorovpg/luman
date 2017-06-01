import React from 'react';
import styled, { css } from 'styled-components';

import Alarm from './Alarm'
import Logo from './Logo'
import Menu from './Menu'
import Search from './Search'
import Container from '../Container'

import { rem, ifProp } from 'utils/style';
import { color } from 'constants/style';

const Root = styled.header`
    position: absolute;
    z-index: 9;
    top: 0;
    right: 0;
    left: 0;
    background-color: #253646;

    ${ifProp('war')(css`
        &:before {
            content: '';

            display: block;
            width: 100%;
            height: ${rem(70)};

            background-color: ${color.war};
        }
    `)}
`

const Wrapper = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: ${rem(5)};
    padding-bottom: ${rem(5)};
`

const Left = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 1;
`

function Header({ title }) {

    return (
        <Root war={!!title}>
            {title &&
                <Alarm data={title} />
            }
            <Wrapper>
                <Left>
                    <Logo war={!!title} />
                    <Menu />
                </Left>
                <Right>
                    <Search />
                </Right>
            </Wrapper>
        </Root>
    )
}

export default Header
