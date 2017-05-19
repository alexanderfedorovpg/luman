import React from 'react';
import Tags from 'components/Tags';
import Rating from 'components/Rating';
import Switch from 'components/Switch';
import {
    Label,
    Input,
    FileInput,
    Select,
    Datepicker,
    Rich,
    Textarea,
    Dropzone,
    ImageLoader,
    RadioButton,
    Checkbox,
} from './';

export const InputRedux = ({ input, meta: { touched, invalid, valid, error }, showError, ...props }) => (
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

export const TextareaRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Textarea
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e)}
    />
);

export const RadioButtonRedux = ({ input, meta, value, ...props }) => (
    <RadioButton
        {...props}
        checked={value === input.value}
        value={value}
        onChange={() => input.onChange(value)}
    />
);

export const SingleCheckboxRedux = ({ input, meta, ...props }) => (
    <Checkbox
        {...props}
        checked={input.checked}
        value={input.value}
        onChange={(e) => input.onChange(e)}
    />
);

export const CheckboxGroupRedux = ({ input, meta, value, ...props }) => (
    <Checkbox
        {...props}
        checked={input.value.indexOf(value) !== -1}
        value={value}
        onChange={(e) => {
            const newValue = [...input.value];
            if (e.target.checked) {
                newValue.push(value);
            } else {
                newValue.splice(newValue.indexOf(value), 1);
            }

            return input.onChange(newValue);
        }}
    />
);

export const RichRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Rich
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e)}
    />
);

export const FileInputRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <FileInput
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e.target.files)}
    />
);

export const SelectRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Select
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(option) => input.onChange(option.value)}
        onBlur={() => input.onBlur(input.value)}
    />
);

export const DatepickerRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Datepicker
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        selected={input.value}
        onChange={(value) => input.onChange(value)}
    />
);

export const DropzoneRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <Dropzone
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onDrop={(files) => input.onChange(files)}
    />
);

export const ImageLoaderRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <ImageLoader
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e.target.files)}
    />
);

export const TagsRedux = ({ input, ...props }) => (
    <Tags
        {...props}
        value={input.value}
        onChange={(checked) => input.onChange(checked)}
    />
);

export const RatingRedux = ({ input, ...props }) => (
    <Rating
        {...props}
        value={input.value}
        onChange={(value) => input.onChange(value)}
    />
);

export const SwitchRedux = ({ input, meta: { touched, error }, showError, ...props }) => (
    <div>
        <Switch
            {...props}
            checked={input.checked}
            value={input.value}
            onChange={(e) => input.onChange(e)}
        />
        {
            touched && showError && error &&
            <Label light error>{error}</Label>
        }
    </div>
);
