import React from 'react';

import ContentModal from 'components/Modal/ContentModal';
import { Group } from 'components/Form';
import { StyledBtn } from '../style';

import { strings } from '../constants'

const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => (
    <ContentModal
        title={strings.commentDeleteModalTitle}
        contentLabel={strings.commentDeleteConfirmation}
        isOpen={open}
        onRequestClose={onClose}
    >
        <Group horizontal>
            <StyledBtn
                onClick={onClose}
                buttonType="cancel"
            >
                {strings.commentDeleteCancelBtn}
            </StyledBtn>
            <StyledBtn
                onClick={onConfirm}
                buttonType="save"
            >
                {strings.commentDeleteOkBtn}
            </StyledBtn>
        </Group>
    </ContentModal>
);

export default ConfirmDeleteModal;
