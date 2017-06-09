import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'

import Input from 'components/Form/Input'
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


const AddEmbedForm = ({ handleSubmit, reset, valid }) => {

    return (
        <div>
            <Field
                name="url"
                block
                placeholder="url"
                component={InputRedux} />
            <Button
                onClick={() => {
                    handleSubmit();
                    reset();
                }}
                disabled={!valid}
                block success
                buttonType="save">
                Вставить
            </Button>
        </div>
    )
}

export default reduxForm({
    form: 'richEditorAddEmbedForm',
    validate(data) {
        let errors = {};
        const values = data.toJS();
        if (!values.url) {
            errors.url = 'Вставьте url';
        }
        return errors
    }
})(AddEmbedForm)
