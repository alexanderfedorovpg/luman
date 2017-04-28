import React from 'react';
import { Input, FileInput, Select, Datepicker, Textarea } from './';

export const InputRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Input
        {...props}
        success={touched && valid}
        error={touched && invalid}
        value={input.value}
        onChange={(e) => input.onChange(e)}
    />
);

export const TextareaRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Textarea
        {...props}
        success={touched && valid}
        error={touched && invalid}
        value={input.value}
        onChange={(e) => input.onChange(e)}
    />
);

export const FileInputRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <FileInput
        {...props}
        success={touched && valid}
        error={touched && invalid}
        value={input.value}
        onChange={(e) => input.onChange(e.target.files)}
    />
);

export const SelectRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Select
        {...props}
        success={touched && valid}
        error={touched && invalid}
        value={input.value}
        onChange={(option) => input.onChange(option.value)}
        onBlur={() => input.onBlur(input.value)}
    />
);

export const DatepickerRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Datepicker
        {...props}
        success={touched && valid}
        error={touched && invalid}
        selected={input.value}
        onChange={(value) => input.onChange(value)}
    />
);
