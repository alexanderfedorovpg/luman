import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { icons } from 'components/Icon';
import { ifProp } from 'utils/style';

const StyledCheckbox = styled.input`
    display: none;

    + span {
        display: inline-block;
        width: ${icons.checkbox.width}px;
        height: ${icons.checkbox.height}px;
        flex-shrink: 0;

        margin-right: 5px;

        background-image: url(${icons.checkbox.data});
    }

    &:checked {
        + span {
            background-image: url(${icons['checkbox-active'].data}) !important;
            width: ${icons['checkbox-active'].width}px;
            height: ${icons['checkbox-active'].height}px;
        }
    }

    &[disabled] {
        + span {
            background-image: url(${icons['checkbox-disabled'].data}) !important;
        }
    }
`;

const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;

    font-size: 13px;
    font-weight: 700;
    color: #767676;

    ${ifProp('checked')(`
        color: #333;
    `)}

    &:hover {
        span {
            background-image: url(${icons['checkbox-hover'].data});
        }
    }
`;

const Checkbox = (props) => {
    const innerProps = {
        ...props,
        children: null,
        className: null,
    };
    return (
        <CheckboxWrapper checked={props.checked} className={props.className}>
            <StyledCheckbox type="checkbox" {...innerProps} />
            <span />
            {props.children}
        </CheckboxWrapper>
    );
};

Checkbox.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    checked: PropTypes.bool,
};

export default Checkbox;
