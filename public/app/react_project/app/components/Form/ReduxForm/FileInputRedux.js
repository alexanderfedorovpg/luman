import React from 'react';
import { FileInput } from '../';

const FileInputRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <FileInput
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e.target.files)}
    />
);

export default FileInputRedux;
