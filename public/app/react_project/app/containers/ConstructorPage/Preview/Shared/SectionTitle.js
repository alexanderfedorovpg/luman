import React from 'react'
import styled from 'styled-components'

import { rem } from 'utils/style'
import { color } from 'constants/style'

const Title = styled.p`
    display: block;
    padding-left: ${rem(28)};
    margin: 0;

    line-height: ${rem(34)};
    text-decoration: none;

    position: relative;
    padding-left: ${rem(24)};
    font-size: ${rem(16)};
    line-height: ${rem(30)};
    text-transform: uppercase;
    letter-spacing: ${rem(-.7)};
    color: ${color.black};
    border-bottom: 1px solid ${color.gray};

    &::after,
    &::before {
        position: absolute;
        content: '';
        display: block;
        width: 0;
        height: 0;
    }

    &::before {
        z-index: 1;
        left: 0;
        top: calc(50% - ${rem(6)});
        border-bottom: ${rem(11)} solid ${color.blue};
        border-left: ${rem(20)} solid transparent;
    }

    &::after {
        z-index: 0;
        left: 0;
        top: calc(50% - ${rem(8)});
        border-top: ${rem(11)} solid ${color.purple};
        border-left: ${rem(20)} solid transparent;
    }

    &_no-border {
      border-bottom: none;
    }
`

export default Title
