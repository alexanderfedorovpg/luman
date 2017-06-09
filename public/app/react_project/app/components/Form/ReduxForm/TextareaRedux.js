import React from 'react';
import { Textarea } from '../';

const TextareaRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Textarea
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e)}
    />
);

export default TextareaRedux;
