import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form/immutable';
import ContentModal from 'components/Modal/ContentModal';
import TypedBtn from 'components/Button/TypedBtn';
import { Group } from 'components/Form';
import { FileInputRedux, ImageLoaderRedux } from 'components/Form/ReduxForm';

const StyledBtn = styled(TypedBtn)`
    flex-grow: 1;

    &:not(:last-child) {
        margin-right: 5px;
    }
`;

const UploadFormModal = ({ isOpen, close, valid, dirty, handleSubmit }) => (
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
            </Group>
            <Group md>
                <Field
                    block
                    placeholder="Выберите превью для видео"
                    name="preview"
                    accept="image/*"
                    multiple={false}
                    icon
                    size="s"
                    component={ImageLoaderRedux}
                />
            </Group>
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

    if (!values.get('video')) {
        errors.video = 'Выберите видео';
    }

    return errors;
};

export default reduxForm({
    form: 'uploadVideoForNews',
    enableReinitialize: true,
    validate,
})(UploadFormModal);
