import React from 'react';
import PropTypes from 'prop-types';
import getYouTubeID from 'get-youtube-id';
import Youtube from 'react-youtube';
import Modal from 'components/Modal';

import { MODALS } from '../constants';

const VideoModal = ({ currentModal, close, videoUrl }) => (
    <Modal
        contentLabel="Просмотр выпуска"
        isOpen={currentModal === MODALS.video}
        onRequestClose={close}
    >
        {
            !!videoUrl &&
            <Youtube
                videoId={getYouTubeID(videoUrl)}
                onReady={(e) => e.target.playVideo()}
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
