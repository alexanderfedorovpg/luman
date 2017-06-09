import React from 'react';
import { ImageLoader } from '../';

const ImageLoaderRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <ImageLoader
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e.target.files)}
    />
);

export default ImageLoaderRedux;
