import React from 'react';
import { Dropzone } from '../';

const DropzoneRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Dropzone
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onDrop={(files) => input.onChange(files)}
    />
);

export default DropzoneRedux;
