import React from 'react';
import { Datepicker } from '../';

const DatepickerRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Datepicker
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        selected={input.value}
        onChange={(value) => input.onChange(value)}
    />
);

export default DatepickerRedux;
