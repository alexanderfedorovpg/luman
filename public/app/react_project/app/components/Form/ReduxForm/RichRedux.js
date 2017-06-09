import React from 'react';
import Rich from '../Rich';

const RichRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Rich
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e)}
    />
);

export default RichRedux;
