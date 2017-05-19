import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import { RadioButtonRedux, CheckboxGroupRedux } from './ReduxForm';
import { Group, Label } from '.';

export const Wrapper = styled(Group)`
    display: flex;
    flex-wrap: wrap;

    > * {
        width: ${(props) => props.itemWidth};
        margin-bottom: ${(props) => props.itemGap};
        padding-right: 10px;
    }
`;

export const StyledLabel = styled(Label)`
    width: 100%;
    flex-basis: 100%;
`;

function renderError({ meta: { touched, error } }) {
    return (touched && !!error) ?
        (
            <StyledLabel
                error
                light
            >
                {error}
            </StyledLabel>
        ) :
        null;
}

function renderControl(data, Component) {
    return <Component key={data.value} {...data}>{data.label}</Component>;
}

const ControlsGroup = ({
    items,
    itemWidth,
    itemGap,
    type,
    name,
    className,
    showError,
}) => {
    let component;

    switch (type) {
        case 'radio':
            component = RadioButtonRedux;
            break;
        default:
            component = CheckboxGroupRedux;
    }

    function renderGroup(fieldProps) {
        return (
            <Wrapper
                itemWidth={itemWidth}
                itemGap={itemGap}
                className={className}
            >
                {items.map((item) => {
                    const controlProps = {
                        value: String(item.value),
                        label: item.label,
                    };

                    return renderControl({ ...fieldProps, ...controlProps }, component);
                })}
                {
                    showError &&
                    renderError(fieldProps)
                }
            </Wrapper>
        );
    }

    return (
        <Field
            name={name}
            component={renderGroup}
        />
    );
};

ControlsGroup.defaultProps = {
    itemWidth: '50%',
    itemGap: '18px',
    type: 'checkbox',
};

ControlsGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string,
    })),
    type: PropTypes.oneOf(['checkbox', 'radio']),
    itemWidth: PropTypes.string,
    itemGap: PropTypes.string,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    showError: PropTypes.bool,
};

export default ControlsGroup;
