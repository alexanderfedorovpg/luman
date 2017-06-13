import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import Input from 'components/Form/Input';
import Button from 'components/Button/TypedBtn';
import { Group } from 'components/Form';

const InputRedux = ({ input, meta: { touched, invalid, valid, error }, showError, ...props }) => (
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


const AddEmbedForm = ({ handleSubmit, reset, valid }) => (
        <div>
            <Group sm>
                <Field
                    name="url"
                    block
                    placeholder="url"
                    component={InputRedux}
                />
            </Group>
            <Group>
                <Button
                    onClick={() => {
                        handleSubmit();
                        reset();
                    }}
                    disabled={!valid}
                    block
                    success
                    buttonType="save"
                >
                    Вставить
                </Button>
            </Group>
        </div>
    );

export default reduxForm({
    form: 'richEditorAddEmbedForm',
    validate(data) {
        const errors = {};
        const values = data.toJS();
        if (!values.url) {
            errors.url = 'Вставьте url';
        }
        return errors;
    },
})(AddEmbedForm);
