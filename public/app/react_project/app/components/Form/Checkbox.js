import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { icons } from 'components/Icon';

const StyledCheckbox = styled.input`
    display: none;

    + span {
        display: inline-block;
        width: ${icons.checkbox.width}px;
        height: ${icons.checkbox.height}px;

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
    &:hover {
        span {
            background-image: url(${icons['checkbox-hover'].data});
        }
    }
`;

const Checkbox = (props) => {
    const innerProps = Object.assign({}, props, { children: null, className: null });
    return (
        <CheckboxWrapper className={props.className}>
            <StyledCheckbox type="checkbox" {...innerProps} />
            <span />
            {props.children}
        </CheckboxWrapper>
    );
};

Checkbox.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Checkbox;
