import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { hidden, ifProp, noProp } from 'utils/style';
import { color } from 'constants/style';

const iconsStyle = css`
    content: '';
    position: absolute;
    top: 50%;

    border-radius: 50%;
    transform: translateY(-50%);
`;

const Wrapper = styled.label`
    position: relative;

    display: block;
    padding-left: 22px;

    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    color: #767676;
    cursor: pointer;

    &::before {
        ${iconsStyle}
        width: 16px;
        height: 16px;
        left: 0;

        border: 1px solid #ccc;
        background-color: #ccc;
    }

    &::after {
        ${iconsStyle}
        left: 3px;

        display: none;
        width: 10px;
        height: 10px;

        background-color: ${color.success};
    }

    ${noProp('checked')(css`
        &:hover {
            color: #333;

            &::before {
                background: transparent;
                border-color: ${color.success};
            }
        }
    `)}

    ${ifProp('checked')(css`
        color: #333;

        &::after {
            display: block;
        }
    `)}
`;

const Input = styled.input`
    ${hidden}
`;

const RadioButton = ({ children, className, checked, ...rest }) => (
    <Wrapper checked={checked} className={className}>
        <Input
            checked={checked}
            type="radio"
            {...rest}
        />

        {Children.toArray(children)}
    </Wrapper>
);

RadioButton.propTypes = {
    children: PropTypes.node,
    checked: PropTypes.bool,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default RadioButton;
