import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import Button from 'components/Button/TypedBtn';
import { Group } from '../index';
import { InputRedux, ImageLoaderRedux } from '../ReduxForm';

function UploadForm({ handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <Group marginBottom="5px">
                <Field
                    name="image"
                    accept="image/*"
                    icon
                    component={ImageLoaderRedux}
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
                    block
                    success
                    buttonType="upload"
                >
                    Загрузить
                </Button>
            </Group>
        </form>
    );
}

export default reduxForm({
    form: 'richEditorImageUploadForm',
    validate(data) {
        const errors = {};
        const values = data.toJS();

        if (!values.image) {
            errors.image = 'Выберите изображение для загрузки';
        }

        return errors;
    },
})(UploadForm);
