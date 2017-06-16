import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form/immutable';
import ContentModal from 'components/Modal/ContentModal';
import TypedBtn from 'components/Button/TypedBtn';
import { Group, Label } from 'components/Form';
import {
    FileInputRedux,
    ImageLoaderRedux,
    InputRedux,
    SelectRedux,
} from 'components/Form/ReduxForm';

const StyledBtn = styled(TypedBtn)`
    flex-grow: 1;

    &:not(:last-child) {
        margin-right: 5px;
    }
`;

const GroupTop = styled(Group)`
    align-items: flex-start;
`;

const GroupWide = styled(Group)`
    margin-left: 5px;
    flex-grow: 1;

    > * {
        &:not(:last-child) {
            margin-bottom: 5px;
        }
    }
`;

const UploadFormModal = ({
    isOpen,
    close,
    programs,
    valid,
    dirty,
    handleSubmit
}) => (
    <ContentModal
        title="Загрузка видео для новости"
        contentLabel="Добавить видео к новости"
        onRequestClose={close}
        isOpen={isOpen}
    >
        <form onSubmit={handleSubmit}>
            <Group md>
                <Field
                    block
                    name="video"
                    accept="video/*"
                    icon="arrow"
                    placeholder="Выберите видео"
                    component={FileInputRedux}
                />
                <Label>или</Label>
                <Field
                    block
                    type="url"
                    name="url"
                    placeholder="Вставьте ссылку на видео"
                    component={InputRedux}
                />
            </Group>
            <Group md>
                <Field
                    placeholder="Программа"
                    searchable={false}
                    clearable={false}
                    name="program_id"
                    options={programs}
                    component={SelectRedux}
                />
            </Group>
            <GroupTop md horizontal>
                <Field
                    placeholder="Выберите превью для видео"
                    name="preview"
                    accept="image/*"
                    multiple={false}
                    icon
                    size="s"
                    component={ImageLoaderRedux}
                />
                <GroupWide>
                    <Field
                        block
                        placeholder="Автор"
                        name="author"
                        component={InputRedux}
                    />
                    <Field
                        block
                        placeholder="Источник"
                        name="source"
                        component={InputRedux}
                    />
                </GroupWide>
            </GroupTop>
            <Group horizontal>
                <StyledBtn
                    buttonType="cancel"
                    type="reset"
                    onClick={close}
                />
                <StyledBtn
                    type="submit"
                    buttonType="upload"
                    success
                    active={valid && dirty}
                />
            </Group>
        </form>
    </ContentModal>
);

UploadFormModal.propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func,
};

const validate = (values) => {
    const errors = {};

    if (!values.get('video') && !values.get('url')) {
        errors.video = 'Выберите видео или вставьте ссылку на видео';
    }

    return errors;
};

export default reduxForm({
    form: 'uploadVideoForNews',
    enableReinitialize: true,
    validate,
})(UploadFormModal);
