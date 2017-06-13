import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';

import Button from 'components/Button/TypedBtn';
import { Group } from 'components/Form';
import InputRedux from 'components/Form/ReduxForm/InputRedux';
import FileInputRedux from 'components/Form/ReduxForm/FileInputRedux';
import ImageLoaderRedux from 'components/Form/ReduxForm/ImageLoaderRedux';

const GroupWide = styled(Group)`
    margin-left: 5px;
    flex-grow: 1;

    > * {
        &:not(:last-child) {
            margin-bottom: 5px;
        }
    }
`;

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
            <Group md horizontal align="top">
                <Field
                    placeholder="Добавить превью"
                    name="preview"
                    accept="image/*"
                    multiple={false}
                    icon
                    size="s"
                    component={ImageLoaderRedux}
                />
                <GroupWide>
                    <Field
                        name="title"
                        block
                        placeholder="Название"
                        component={InputRedux}
                    />
                    <Field
                        name="author"
                        block
                        placeholder="Автор"
                        component={InputRedux}
                    />
                    <Field
                        name="source"
                        block
                        placeholder="Источник"
                        component={InputRedux}
                    />
                </GroupWide>
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
