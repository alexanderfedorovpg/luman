import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import { RadioButtonRedux } from './ReduxForm';
import { Group, Label } from '.';

export const RadioGroup = styled(Group)`
    display: flex;
    flex-wrap: wrap;

    > * {
        flex-basis: 38%;
        width: 38%;
        margin-bottom: 12px;
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

const RadioButtonsGroup = ({ items, name, className }) => {
    function renderButton(btn) {
        return (
            <Field
                name={name}
                key={btn.value}
                value={String(btn.value)}
                type="radio"
                component={RadioButtonRedux}
            >
                {btn.label}
            </Field>
        );
    }

    return (
        <RadioGroup className={className}>
            {items.map(renderButton)}
            <Field name="group" component={renderError} />
        </RadioGroup>
    );
};

RadioButtonsGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string,
    })),
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default RadioButtonsGroup;
