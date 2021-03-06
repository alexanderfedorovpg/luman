import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import Textarea from 'components/Form/Textarea';
import Button from 'components/Button/TypedBtn';
import { Group } from 'components/Form';

const TextareaRedux = ({ input, meta: { touched, invalid, valid, error }, showError, ...props }) => (
    <div>
        <Textarea
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


const AddHTMLForm = ({ handleSubmit, reset, valid }) => (
        <div>
            <Group>
                <Field
                    name="html"
                    block
                    placeholder="html"
                    component={TextareaRedux}
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
    form: 'richEditorAddHtmlForm',
    validate(data) {
        const errors = {};
        const values = data.toJS();
        if (!values.html) {
            errors.html = 'Вставьте html';
        }
        return errors;
    },
})(AddHTMLForm);
