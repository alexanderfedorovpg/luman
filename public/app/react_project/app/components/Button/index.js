import React from 'react'
import styled from 'styled-components'
import { rem } from '../../utils/style'

export const Button = styled.button`
    display: inline-block;
    height: 36px;
    border: 1px solid #cccccc;

    font-family: 'HelveticaNeue', Helvetica, Arial, sans-serif;
    font-size: ${rem(14)};
    line-height: 36px;
    font-weight: 700;
    color: #333333;

    outline: 0;
    background: transparent;

    &:hover {
        color: #fff;
    }

    // styling
    &.success {

        &:not([disabled]):hover {
            background-color: #390;
        }

    }

    &.danger {
        font-weight: 400;
        color: #666666;

        &:not([disabled]):hover {
            background-color: #c00;
        }

    }

    &.primary {

        &:not([disabled]):hover {
            background-color: #369;
        }

    }

    .icon {
        margin-top: -3px;
    }

    i.icon {
        margin-right: 6px;
    }
`

export const ButtonBlock = styled(Button)`
    display: block;
    width: 100%;
`

export const ButtonMd = styled(Button)`
    width: 214px;
`

export const ButtonXs = styled(Button)`
    padding-left: ${rem(9)};
    padding-right: ${rem(9)};
    &:not([disabled]):hover,
    &:not([disabled]):active {

        &.btn-success {
            border-color: #390;
        }

        &.btn-danger {
            border-color: #c00;
        }

        &.btn-primary {
            border-color: #369;
        }

    }
`
