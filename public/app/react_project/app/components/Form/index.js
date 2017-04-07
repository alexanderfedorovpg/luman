import React from 'react'
import styled, { css } from 'styled-components'

import Select from './Select'
import Input, { InputIcon, Checkbox } from './Input'

import { ifProp, rem } from './../../utils/style'
import { color, height, font } from './../../constants/style'

export { Select, Input, InputIcon, Checkbox }

export const Horizontal = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

export const Group = styled.div`
    margin-bottom: 24px;

    &:last-child {
        margin-bottom: 0;
    }

    ${ifProp('sm')`
        margin-bottom: 15px;
    `}

    ${ifProp('horizontal')`
        display: flex;
        align-items: center;
        justify-content: flex-start;
    `}
`

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;

    letter-spacing: -0.1px;

    ${ifProp('bold')(css`
        color: #333333;
        font-family: ${font.opensans};
        font-size: ${rem(13)};
        font-weight: 700;
        line-height: ${rem(18)};
    `)}

    ${ifProp('light')(css`
        color: #999999;
        font-family: ${font.opensans};
        font-size: 11px;
        font-weight: 400;
    `)}

    ${ifProp('right')`
        float: right;
    `}
`

export const Textarea = styled.textarea`
    padding: 13px 16px;
    border: 1px solid rgba(204, 204, 204, 0.74);

    color: #000000;
    font-family: ${font.opensans};
    font-size: ${rem(21)};
    font-weight: bold;
    line-height: ${rem(26)};

    resize: none;

    ${ifProp('block')`
        display: block;
        width: 100%;
    `}

    ${ifProp('light')(css`
        min-height: 91px;

        color: #666666;
        font-family: ${font.opensans};
        font-size: ${rem(16)};
        font-weight: 400;
        line-height: ${rem(21)};
    `)}


    ${ifProp('error')(css`
        border-color: ${color.danger};
    `)}
`
