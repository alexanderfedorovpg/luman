import React from 'react';
import {
    Label,
    Input,
} from '../';

const InputRedux = ({ input, meta: { touched, invalid, valid, error }, showError, ...props }) => (
    <div>
        <Input
            {...props}
            success={touched && valid && !props.disabled}
            error={touched && invalid && !props.disabled}
            value={input.value}
            onChange={(e) => input.onChange(e)}
        />
        {
            touched && showError && error &&
            <Label light error>{error}</Label>
        }
    </div>
);

export default InputRedux;
