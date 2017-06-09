import React from 'react';
import { Select } from '../';

const SelectRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Select
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(option) => input.onChange(option.value)}
        onBlur={() => input.onBlur(input.value)}
    />
);

export default SelectRedux;
