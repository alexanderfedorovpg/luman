import React from 'react'
import styled from 'styled-components'

import Copyright from './Copyright'
import Menu from './Menu'
import Subscribe from './Subscribe'

import { rem } from 'utils/style'
import { color } from 'constants/style'

import logo from './logo-footer.png';

const Root = styled.footer`
    padding-top: ${rem(34)};
    padding-bottom: ${rem(50)};

    background-color: ${color.enter};

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Logo = styled.div`
    margin-top: -66px;
`

const Left = styled.div`
    width: ${rem(126)};
`

const Middle = styled.div`
    width: ${rem(377)};
    margin-left: ${rem(41)};
`

const Right = styled.div`
    width: ${rem(255)};
    margin-left: ${rem(89)};
`

function Footer() {

    return (
        <Root>
            <Left>
                <Logo>
                    <img src={logo} />
                </Logo>
                <Copyright />
            </Left>
            <Middle>
                <Menu />
            </Middle>
            <Right>
                <Subscribe />
            </Right>
        </Root>
    )
}

export default Footer
