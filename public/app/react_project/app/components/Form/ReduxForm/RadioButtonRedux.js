import React from 'react';
import { RadioButton } from '../';

const RadioButtonRedux = ({ input, meta, value, ...props }) => (
    <RadioButton
        {...props}
        checked={value === input.value}
        value={value}
        onChange={() => input.onChange(value)}
    />
);

export default RadioButtonRedux;
