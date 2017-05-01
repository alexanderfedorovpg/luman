import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';

import { MODALS } from '../constants';
import { Player } from './style';

const VideoModal = ({ currentModal, close, videoUrl }) => (
    <Modal
        contentLabel="Просмотр выпуска"
        isOpen={currentModal === MODALS.video}
        onRequestClose={close}
    >
        {
            !!videoUrl &&
            <Player
                src={videoUrl}
            />
        }
    </Modal>
);

VideoModal.propTypes = {
    currentModal: PropTypes.string,
    close: PropTypes.func,
    videoUrl: PropTypes.string,
};

export default VideoModal;
