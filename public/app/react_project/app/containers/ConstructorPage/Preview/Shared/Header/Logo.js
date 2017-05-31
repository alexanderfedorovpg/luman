import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

import logo from './logo.png'
import logoWar from './logo-war.png'

import { rem } from 'utils/style'

const Root = styled.div`
    position: relative;

    width: ${rem(138)};
    margin-right: ${rem(28)};
    margin-left: ${rem(38)};
`

const Img = styled.img`
    position: absolute;
    top: ${rem(-10)};
    left: 0;
    width: ${rem(138)};
`

function Logo({ war }) {

    return (
        <Root>
            <Link to="/">
                <Img src={war ? logoWar : logo} />
            </Link>
        </Root>
    )
}

export default Logo
