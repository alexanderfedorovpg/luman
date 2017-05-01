import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ContentModal from 'components/Modal/ContentModal';

import { hideInfoModal } from '../actions';
import { makeSelectInfo } from '../selectors';

const RecordFormModal = ({ text, ...props }) => (
    <ContentModal
        contentLabel="Информация"
        onRequestClose={props.hideInfoModal}
        isOpen={!!text}
    >
        <p>{text}</p>
    </ContentModal>
);

RecordFormModal.propTypes = {
    hideInfoModal: PropTypes.func,
    text: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
    text: makeSelectInfo(),
});

export default connect(mapStateToProps, { hideInfoModal })(RecordFormModal);
