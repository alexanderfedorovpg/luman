import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import Input from 'components/Form/Input';
import FileInput from 'components/Form/FileInput';
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

const FileInputRedux = ({ input, meta: { touched, invalid, valid }, ...props }) => (
    <FileInput
        {...props}
        success={touched && valid && !props.disabled}
        error={touched && invalid && !props.disabled}
        value={input.value}
        onChange={(e) => input.onChange(e.target.files)}
    />
);

function UploadForm({ handleSubmit, reset }) {
    return (
        <div>
            <Group marginBottom="5px">
                <Field
                    block
                    name="video"
                    accept="video/*"
                    icon="arrow"
                    placeholder="Выберите видео"
                    component={FileInputRedux}
                />
            </Group>
            <Group marginBottom="5px">
                <Field
                    name="title"
                    block
                    placeholder="Название"
                    component={InputRedux}
                />
            </Group>
            <Group marginBottom="5px">
                <Field
                    name="author"
                    block
                    placeholder="Автор"
                    component={InputRedux}
                />
            </Group>
            <Group sm>
                <Field
                    name="source"
                    block
                    placeholder="Источник"
                    component={InputRedux}
                />
            </Group>
            <Group>
                <Button
                    onClick={() => {
                        if (!handleSubmit()) {
                            reset();
                        }
                    }}
                    block success
                    buttonType="upload"
                >
                    Загрузить
                </Button>
            </Group>
        </div>
    );
}

export default reduxForm({
    form: 'richEditorVideoUploadForm',
    validate(data) {
        const errors = {};
        const values = data.toJS();

        if (!values.video) {
            errors.video = 'Выберите видео для загрузки';
        }

        return errors;
    },
})(UploadForm);
