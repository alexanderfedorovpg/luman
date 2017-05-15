import React from 'react';
import Tags from 'components/Tags';
import Rating from 'components/Rating';
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
} from './';

export const InputRedux = ({ input, meta: { touched, invalid, valid, dirty, error }, showError, ...props }) => (
    <div>
        <Input
            {...props}
            success={touched && valid && dirty && !props.disabled}
            error={touched && invalid && dirty && !props.disabled}
            value={input.value}
            onChange={(e) => input.onChange(e)}
        />
        {
            touched && showError &&
            <Label light error>{error}</Label>
        }
    </div>
);

export const TextareaRedux = ({ input, meta: { touched, invalid, valid, dirty }, ...props }) => (
    <Textarea
        {...props}
        success={touched && valid && dirty && !props.disabled}
        error={touched && invalid && dirty && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e)}
    />
);

export const RichRedux = ({ input, meta: { touched, invalid, valid, dirty }, ...props }) => (
    <Rich
        {...props}
        success={touched && valid && dirty && !props.disabled}
        error={touched && invalid && dirty && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e)}
    />
);

export const FileInputRedux = ({ input, meta: { touched, invalid, valid, dirty }, ...props }) => (
    <FileInput
        {...props}
        success={touched && valid && dirty && !props.disabled}
        error={touched && invalid && dirty && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e.target.files)}
    />
);

export const SelectRedux = ({ input, meta: { touched, invalid, valid, dirty }, ...props }) => (
    <Select
        {...props}
        success={touched && valid && dirty && !props.disabled}
        error={touched && invalid && dirty && !props.disabled}
        value={input.value}
        onChange={(option) => input.onChange(option.value)}
        onBlur={() => input.onBlur(input.value)}
    />
);

export const DatepickerRedux = ({ input, meta: { touched, invalid, valid, dirty }, ...props }) => (
    <Datepicker
        {...props}
        success={touched && valid && dirty && !props.disabled}
        error={touched && invalid && dirty && !props.disabled}
        selected={input.value}
        onChange={(value) => input.onChange(value)}
    />
);

export const DropzoneRedux = ({ input, meta: { touched, invalid, valid, dirty }, ...props }) => (
    <Dropzone
        {...props}
        success={touched && valid && dirty && !props.disabled}
        error={touched && invalid && dirty && !props.disabled}
        value={input.value}
        onDrop={(files) => input.onChange(files)}
    />
);

export const ImageLoaderRedux = ({ input, meta: { touched, invalid, valid, dirty }, ...props }) => (
    <ImageLoader
        {...props}
        success={touched && valid && dirty && !props.disabled}
        error={touched && invalid && dirty && !props.disabled}
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
