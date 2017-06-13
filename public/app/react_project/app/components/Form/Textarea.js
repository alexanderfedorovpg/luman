import React from 'react';
import styled, { css } from 'styled-components';

import Icon from 'components/Icon';

import { ifProp, rem } from 'utils/style';
import { color, height, font, heightTextarea } from 'constants/style';

export const textareaCSS = css`
    display: inline-block;
    height: ${heightTextarea};
    padding: 11px;
    width: 100%;
    resize: none;
    border: 1px solid rgba(204, 204, 204, 0.74);

    color: #666666;
    font-family: ${font.opensans};
    font-size: 14px;
    font-weight: 400;

    &::placeholder {
        color: #ccc;
        opacity: 1;
    }

    ${ifProp('disabled')(css`
        cursor: not-allowed;
    `)}

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

    ${ifProp(['icon', 'right'])(css`
        padding-left: ${rem(8)};
        padding-right: 35px;
    `)}
`;

const Textarea = styled.textarea`
    ${textareaCSS}
`;

export const TextareaIconWrapper = styled.div`
    position: relative;
`;

export const IconWrapper = (Icon) => styled(Icon)`
    position: absolute;
    top: 50%;
    left: 9px;
    transform: translateY(-50%);

    ${ifProp('right')`
        left: auto;
        right: 9px;
    `}
`;

const StyledIcon = IconWrapper(Icon);

export const textareaIcon = (props) => {
    const textareaProps = Object.assign({}, props, {
        className: undefined,
    });

    return (
        <TextareaIconWrapper className={props.className}>
            <Textarea {...textareaProps} block />
            <StyledIcon type={props.icon} right={props.right} />
        </TextareaIconWrapper>
    );
};

export default Textarea;
