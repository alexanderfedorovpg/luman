import React from 'react'
import styled, { css } from 'styled-components'

import Icon from './../Icon'

import { ifProp } from './../../utils/style'
import { color, height, font } from './../../constants/style'

const Input = styled.input`
    display: inline-block;
    height: ${height};
    padding-left: 11px;
    padding-right: 11px;
    border: 1px solid rgba(204, 204, 204, 0.74);

    color: #666666;
    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;
    line-height: ${height};

    ${ifProp('success')(css`
        border-color: ${color.success};
    `)}

    ${ifProp('error')(css`
        border-color: ${color.danger};
    `)}

    &[disabled] {
        color: #cccccc;
    }

    ${ifProp('md')`
        width: 247px;
    `}

    ${ifProp('block')`
        display: block;
        width: 100%;
    `}

    ${ifProp('icon')`
        padding-left: 35px;
    `}

`

export const InputIconWrapper = styled.div`
    position: relative;
`

export const IconWrapper = Icon => styled(Icon)`
    position: absolute;
    top: 50%;
    left: 9px;
    transform: translateY(-50%);
`

const StyledIcon = IconWrapper(Icon)

export const InputIcon = props => {

    let inputProps = Object.assign({}, props, {
        className: undefined
    })

    return (
        <InputIconWrapper className={props.className}>
            <Input {...inputProps} />
            <StyledIcon type={props.icon} />
        </InputIconWrapper>
    )
}

export default Input
