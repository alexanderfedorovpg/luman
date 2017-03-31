import React from 'react'
import styled, { css } from 'styled-components'

import Icon, { icons } from './../Icon'

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

const StyledCheckbox = styled.input`
    display: none;

    + span {
        display: inline-block;
        width: ${icons['checkbox'].width}px;
        height: ${icons['checkbox'].height}px;

        margin-right: 5px;

        background-image: url(${icons['checkbox'].data});
    }

    &:checked {
        + span {
            background-image: url(${icons['checkbox-active'].data}) !important;
        }
    }

    &[disabled] {
        + span {
            background-image: url(${icons['checkbox-disabled'].data}) !important;
        }
    }
`

const CheckboxWrapper = styled.label`
    &:hover {
        span {
            background-image: url(${icons['checkbox-hover'].data});
        }
    }
`

export const Checkbox = props => {
    let innerProps = Object.assign({}, props, { children: null, className: null })
    return (
        <CheckboxWrapper className={props.className}>
            <StyledCheckbox type="checkbox" {...innerProps} />
            <span />
            {props.children}
        </CheckboxWrapper>
    )
}

export default Input
