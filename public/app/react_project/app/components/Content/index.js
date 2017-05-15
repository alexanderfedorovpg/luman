import React from 'react'
import styled, { css } from 'styled-components';

import { padding } from 'constants/style'
import { ifProp, rem } from 'utils/style'

const Content = styled.div`
    position: relative;
    padding-right: ${padding};
    padding-top: 138px;
    margin-left: 67px;
    margin-bottom: ${padding};
    left: 0;

    transition: all 0.4s ease;

    ${ifProp('moved')`
        left: 180px
    `}
`

export const Wrap = styled.div`
    display: flex;
    align-items: stretch;

    ${ifProp('margin')(css`
        margin-top: ${rem(10)}
    `)}
`

export const Left = styled.div`
    flex: 1;
    margin-top: -11px;
    border-right: 1px solid #d7d7d7;
`

export const Right = styled.div`
    width: 40.384%;
    flex-basis: 40.383%;
    margin-top: 0;
    padding-left: ${padding};
`

export default Content
