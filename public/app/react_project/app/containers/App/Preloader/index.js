import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'components/Modal';
import { makeSelectPreloader } from '../selectors';
import preloader from './squares.gif';

const PreloaderModal = ({ isOpen }) => (
    <Modal
        contentLabel="Подождите, идёт загрузка"
        isOpen={isOpen}
    >
        <img width="90" src={preloader} alt="" />
    </Modal>
);

PreloaderModal.propTypes = {
    isOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    isOpen: makeSelectPreloader(),
});

export default connect(mapStateToProps)(PreloaderModal);
