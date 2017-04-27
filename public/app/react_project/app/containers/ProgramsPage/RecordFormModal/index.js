import React from 'react';
import PropTypes from 'prop-types';
import ContentModal from 'components/Modal/ContentModal';

import RecordForm from '../RecordForm';
import { MODALS } from '../constants';

const RecordFormModal = ({ currentModal, close }) => (
    <ContentModal
        title="Загрузка программы"
        contentLabel="Добавить или отредактировать выпуск"
        onRequestClose={close}
        isOpen={currentModal === MODALS.record}
    >
        <RecordForm onCancel={close} />
    </ContentModal>
);

RecordFormModal.propTypes = {
    currentModal: PropTypes.string,
    close: PropTypes.func,
};

export default RecordFormModal;
