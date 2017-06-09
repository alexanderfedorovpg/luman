import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import Input from 'components/Form/Input'
import ImageLoader from 'components/Form/ImageLoader'
import Button from 'components/Button/TypedBtn'

const InputRedux = ({ input, meta: { touched, invalid, valid, error }, showError, ...props }) => (
    <div>
        <Input
            {...props}
            success={touched && valid && !props.disabled}
            error={touched && invalid && !props.disabled}
            value={input.value}
            onChange={(e) => input.onChange(e)} />
        {
            touched && showError && error &&
            <Label light error>{error}</Label>
        }
    </div>
);

const ImageLoaderRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <ImageLoader
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e.target.files)} />
);

function UploadForm({ handleSubmit, reset }) {

    return (
        <div>
            <Field
                name="image"
                accept="image/*"
                icon
                component={ImageLoaderRedux} />
            <Field
                name="title"
                block
                placeholder="Название"
                component={InputRedux} />
            <Field
                name="author"
                block
                placeholder="Автор"
                component={InputRedux} />
            <Field
                name="source"
                block
                placeholder="Источник"
                component={InputRedux} />
            <Button
                onClick={() => {
                    if (!handleSubmit()) {
                        reset();
                    }
                }}
                block success
                buttonType="upload">

                Загрузить
            </Button>
        </div>
    )
}

export default reduxForm({
    form: 'richEditorImageUploadForm',
    validate(data) {
        let errors = {};
        const values = data.toJS();

        if (!values.image) {
            errors.image = 'Выберите изображение для загрузки';
        }

        return errors
    }
})(UploadForm)
