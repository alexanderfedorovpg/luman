import React from 'react'
import styled from 'styled-components'

export const Input = styled.input`
    display: inline-block;
    height: 36px;
    padding-left: 11px;
    padding-right: 11px;
    border: 1px solid #cccccc;

    color: #666666;
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 36px;

    &.success {
        border-color: #390;
    }

    &.error {
        border-color: #c00;
    }

    &[disabled] {
        color: #cccccc;
    }

`

export const InputBlock = styled(Input)`
    display: block;
    width: 100%;

`

export const InputMd = styled(Input)`
    width: 247px;

`
