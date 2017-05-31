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
import withPermissions from 'HOC/withPermissions';

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
        const { selectedRecord, checkPermissions } = this.props;
        const { modal, pendingToDelete } = this.props.ProgramsPage;

        return (
            <Wrapper>
                <Helmet title="Список программ" />
                <Header checkPermissions={checkPermissions} />
                {
                    checkPermissions('records', true, ['getList']) &&
                    <Content>
                        <ProgramsFilter />
                        <Records checkPermissions={checkPermissions} />
                    </Content>
                }

                <RecordFormModal
                    currentModal={modal}
                    close={this.props.closeModal}
                    canUploadVideo={checkPermissions('records', true, ['upload'])}
                    canUploadFile={checkPermissions('file', true, ['upload'])}
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
    checkPermissions: PropTypes.func,
    closeModal: PropTypes.func,
    deleteRecord: PropTypes.func,
    openPage: PropTypes.func,
    ProgramsPage: PropTypes.object,
    selectedRecord: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(withPermissions(ProgramsPage));
