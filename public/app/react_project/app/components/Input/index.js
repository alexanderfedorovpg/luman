import React from 'react'
import styled from 'styled-components'
import { ifProp } from '../../utils/style'
import { font, color, height } from '../../constants/style'

const Input = styled.input`
    display: inline-block;
    height: ${height};
    padding-left: 11px;
    padding-right: 11px;
    border: 1px solid #cccccc;

    color: #666666;
    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    line-height: ${height};

    &.success {
        border-color: ${color.success};
    }

    &.error {
        border-color: ${color.danger};
    }

    &[disabled] {
        color: #cccccc;
    }

    ${ifProp('block')`
        display: block;
        width: 100%;
    `}

    ${ifProp('md')`
        width: 214px;
    `}
`

export default Input
