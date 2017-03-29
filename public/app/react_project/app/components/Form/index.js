import React from 'react'
import styled from 'styled-components'

import { ifProp, rem } from './../../utils/style'
import { color, height, font } from './../../constants/style'

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

    ${ifProp('md')`
        margin-bottom: 15px;
    `}
`

export const Input = styled.input`
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

    &.success {
        border-color: ${color.success};
    }

    &.error {
        border-color: ${color.danger};
    }

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

export const Textarea = styled.textarea`
    padding: 13px 16px;
    border: 1px solid rgba(204, 204, 204, 0.74);

    color: #000000;
    font-family: ${font.opensans};
    font-size: ${rem(21)};
    font-weight: bold;
    line-height: ${rem(26)};

    resize: none;

`

// .form-horizontal {
// }

// .form-group {

// }

// // input
// .input {

//     // input with icon
//     &-icon {
//         position: relative;

//         input {
//             padding-left: 35px;
//         }

//         .icon {
//         }

//     }

// }
