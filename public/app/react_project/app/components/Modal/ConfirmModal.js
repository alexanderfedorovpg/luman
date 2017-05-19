import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Group } from 'components/Form';
import TypedBtn from 'components/Button/TypedBtn';

import ContentModal from './ContentModal';

const Btn = styled(TypedBtn)`
    flex-grow: 1;

    &:not(:last-child) {
        margin-right: 5px;
    }
`;

const ConfirmModal = ({
    isOpen,
    title,
    contentLabel,
    onClose,
    onConfirm,
    cancelText,
    confirmText,
}) => (
    <ContentModal
        title={title}
        contentLabel={contentLabel}
        isOpen={isOpen}
        onRequestClose={onClose}
    >
        <Group horizontal>
            <Btn
                onClick={onClose}
                buttonType="save"
            >
                {cancelText}
            </Btn>
            <Btn
                onClick={onConfirm}
                buttonType="cancel"
            >
                {confirmText}
            </Btn>
        </Group>
    </ContentModal>
);

ConfirmModal.defaultProps = {
    contentLabel: 'Подтвердить действие',
    cancelText: 'Нет',
    confirmText: 'Да',
};

ConfirmModal.propTypes = {
    isOpen: PropTypes.bool,
    contentLabel: PropTypes.string,
    title: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
};

export default ConfirmModal;
