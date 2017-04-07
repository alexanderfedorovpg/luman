import React from 'react'
import styled, { keyframes, css } from 'styled-components'

import { ifProp } from 'utils/style'
import { color } from 'constants/style'

const blink = keyframes`
    0% {
      opacity: .4;
    }

    20% {
      opacity: 1;
    }

    100% {
      opacity: .4;
    }
`

const Root = styled.div`
    display: flex;
    align-items: center;
`

const Dot = styled.span`
    display: block;
    width: 8px;
    height: 8px;
    margin-right: 3px;

    border-radius: 50%;
    background-color: #cdcdcd;

    &:nth-child(2) {
        animation-delay: .2s;
    }

    &:last-child {
        margin-right: 0;

        animation-delay: .4s;
    }

    ${ifProp('active')(css`
        background-color: ${color.success};

        animation-name: ${blink};
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
    `)}
`

function Status({ active }) {
    return (
        <Root>
            <Dot active={active} />
            <Dot active={active} />
            <Dot active={active} />
        </Root>
    )
}

export default Status
