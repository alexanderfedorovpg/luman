/*
 *
 * ProgramsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import makeSelectProgramsPage, {
    makeGetSelectedRecord,
} from './selectors';
import {
    openPage,
    deleteRecord,
    closeModal,
} from './actions';

import Header from './Header';
import ProgramsFilter from './ProgramsFilter';
import Records from './Records';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import RecordFormModal from './RecordFormModal';
import VideoModal from './VideoModal';
import { Wrapper, Content } from './style';

export class ProgramsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.openPage();
    }

    render() {
        const { selectedRecord } = this.props;
        const { modal, pendingToDelete } = this.props.ProgramsPage;

        return (
            <Wrapper>
                <Helmet title="Список программ" />
                <Header />
                <Content>
                    <ProgramsFilter />
                    <Records />
                </Content>

                <RecordFormModal
                    currentModal={modal}
                    close={this.props.closeModal}
                />

                <ConfirmDeleteModal
                    currentModal={modal}
                    close={this.props.closeModal}
                    onConfirm={() => this.props.deleteRecord(pendingToDelete)}
                />

                <VideoModal
                    currentModal={modal}
                    close={this.props.closeModal}
                    videoUrl={selectedRecord ? selectedRecord.video : null}
                />
            </Wrapper>
        );
    }
}

ProgramsPage.propTypes = {
    openPage: PropTypes.func,
    deleteRecord: PropTypes.func,
    closeModal: PropTypes.func,
    selectedRecord: PropTypes.object,
    ProgramsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    ProgramsPage: makeSelectProgramsPage(),
    selectedRecord: makeGetSelectedRecord(),
});

function mapDispatchToProps(dispatch) {
    return {
        openPage: () => dispatch(openPage()),
        deleteRecord: (id) => dispatch(deleteRecord(id)),
        closeModal: () => dispatch(closeModal()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsPage);
