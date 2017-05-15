import React from 'react';
import PropTypes from 'prop-types';
import ContentModal from 'components/Modal/ContentModal';
import { Group } from 'components/Form';

import { MODALS } from '../constants';
import { StyledBtn } from '../style';

const ConfirmDeleteModal = ({ currentModal, close, onConfirm }) => (
    <ContentModal
        title="Вы уверены, что хотите удалить этот выпуск?"
        contentLabel="Подтверждение удаления выпуска"
        isOpen={currentModal === MODALS.confirmRecordDelete}
        onRequestClose={close}
    >
        <Group horizontal>
            <StyledBtn
                onClick={close}
                buttonType="save"
            >
                Передумал удалять
            </StyledBtn>
            <StyledBtn
                onClick={onConfirm}
                buttonType="cancel"
            >
                Да, жажду удалить
            </StyledBtn>
        </Group>
    </ContentModal>
);

ConfirmDeleteModal.propTypes = {
    currentModal: PropTypes.string,
    close: PropTypes.func,
    onConfirm: PropTypes.func,
};

export default ConfirmDeleteModal;
