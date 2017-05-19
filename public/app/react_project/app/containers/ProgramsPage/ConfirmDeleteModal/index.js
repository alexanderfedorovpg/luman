import React from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from 'components/Modal/ConfirmModal';

import { MODALS } from '../constants';

const ConfirmDeleteModal = ({ currentModal, close, onConfirm }) => (
    <ConfirmModal
        title="Вы уверены, что хотите удалить этот выпуск?"
        contentLabel="Подтверждение удаления выпуска"
        isOpen={currentModal === MODALS.confirmRecordDelete}
        onClose={close}
        onConfirm={onConfirm}
        cancelText="Передумал удалять"
        confirmText="Да, жажду удалить"
    />
);

ConfirmDeleteModal.propTypes = {
    currentModal: PropTypes.string,
    close: PropTypes.func,
    onConfirm: PropTypes.func,
};

export default ConfirmDeleteModal;
