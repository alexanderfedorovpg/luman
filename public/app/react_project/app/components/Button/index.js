import React from 'react'
import styled, { css } from 'styled-components'
import { rem, ifProp } from '../../utils/style'
import { font, color, height } from '../../constants/style'

const Button = styled.button`
    display: inline-block;
    height: ${height};
    border: 1px solid #cccccc;

    font-family: ${font.helvetica};
    font-size: ${rem(14)};
    line-height: ${height};
    font-weight: 700;
    color: #333333;

    outline: 0;
    background: transparent;

    &:hover {
        color: #fff;
    }

    ${ifProp('success')(css`
        &:not([disabled]):hover {
            background-color: ${color.success};
        }
    `)}

    ${ifProp('danger')(css`
        font-weight: 400;
        color: #666666;

        &:not([disabled]):hover {
            background-color: ${color.danger};
        }
    `)}

    ${ifProp('primary')(css`
        &:not([disabled]):hover {
            background-color: ${color.primary};
        }
    `)}

    .icon {
        margin-top: -3px;
    }

    i.icon {
        margin-right: 6px;
    }

    ${ifProp('block')`
        display: block;
        width: 100%;
    `}

    ${ifProp('md')`
        width: 214px;
    `}

    ${ifProp('xs')(css`
        padding-left: ${rem(9)};
        padding-right: ${rem(9)};
        &:not([disabled]):hover,
        &:not([disabled]):active {

            &.success {
                border-color: ${color.success};
            }

            &.danger {
                border-color: ${color.danger};
            }

            &.primary {
                border-color: ${color.primary};
            }

        }
    `)}

`

export default Button