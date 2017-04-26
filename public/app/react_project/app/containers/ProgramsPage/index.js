/*
 *
 * ProgramsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import debounce from 'lodash/debounce';
import getYouTubeID from 'get-youtube-id';
import { selectMenuExpandedStatus } from 'containers/App/selectors';
import { loadRubrics } from 'containers/App/actions';
import Records from 'components/Records';
import Modal from 'components/Modal';
import ContentModal from 'components/Modal/ContentModal';
import Waypoint from 'react-waypoint';
import Youtube from 'react-youtube';
import { Group } from 'components/Form';
import makeSelectProgramsPage, {
    makeSelectRubricsNames,
    makeGetRecords,
    makeGetSelectedRecord,
} from './selectors';
import { MODALS } from './constants';
import {
    openPage,
    setRecordsType,
    deleteRecord,
    changeRubric,
    loadRecords,
    openModal,
    closeModal,
    startEditRecord,
    searchRecord,
    playVideo,
} from './actions';
import Header from './Header';
import { StyledBtn, Wrapper, Content } from './style';
import Rubrics from './Rubrics';
import RecordForm from './RecordForm';

export class ProgramsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.loadMoreRecords = this.loadMoreRecords.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.searchRecords = debounce(props.search, 300);

        this.state = {
            pendingDelete: null,
        };
    }

    componentDidMount() {
        this.props.openPage();
    }

    onDeleteClick(id) {
        this.setState({
            pendingDelete: id,
        });

        this.props.openModal(MODALS.confirmRecordDelete);
    }

    loadMoreRecords() {
        this.props.loadRecords(false);
    }

    render() {
        const { menuOpen, rubrics, records, selectedRecord } = this.props;
        const { recordsType, rubric, loading, allRecordsUploaded, modal } = this.props.ProgramsPage;

        return (
            <Wrapper>
                <Helmet title="Список программ" />
                <Header
                    moved={menuOpen}
                    type={recordsType}
                    onSearch={this.searchRecords}
                    onUpload={() => this.props.openModal(MODALS.record)}
                    setRecordsType={this.props.setRecordsType}
                />
                <Content>
                    {
                        !!rubrics &&
                        <Rubrics
                            selected={rubric}
                            onRubricChange={this.props.changeRubric}
                            rubrics={rubrics}
                        />
                    }
                    {
                        !!records &&
                        <Records
                            onPreviewClick={this.props.playVideo}
                            onRecordEdit={this.props.startEditRecord}
                            onRecordDelete={this.onDeleteClick}
                            items={records}
                        />
                    }
                    {
                        loading ?
                        'Загрузка...' :
                        !allRecordsUploaded &&
                        <Waypoint
                            bottomOffset="-50%"
                            scrollableAncestor={window}
                            onEnter={this.loadMoreRecords}
                        />
                    }
                </Content>

                <ContentModal
                    title="Загрузка программы"
                    contentLabel="Добавить или отредактировать выпуск"
                    onRequestClose={this.props.closeModal}
                    isOpen={modal === MODALS.record}
                >
                    <RecordForm onCancel={this.props.closeModal} />
                </ContentModal>

                <ContentModal
                    title="Вы уверены, что хотите удалить этот выпуск?"
                    contentLabel="Подтверждение удаления выпуска"
                    isOpen={modal === MODALS.confirmRecordDelete}
                    onRequestClose={this.props.closeModal}
                >
                    <Group horizontal>
                        <StyledBtn onClick={this.props.closeModal} primary>
                            Отменить
                        </StyledBtn>
                        <StyledBtn
                            onClick={() => this.props.deleteRecord(this.state.pendingDelete)}
                            danger
                        >
                            Удалить
                        </StyledBtn>
                    </Group>
                </ContentModal>

                <Modal
                    contentLabel="Просмотр выпуска"
                    isOpen={modal === MODALS.video}
                    onRequestClose={this.props.closeModal}
                >
                    {
                        !!selectedRecord &&
                        <Youtube
                            videoId={getYouTubeID(selectedRecord.video_url)}
                            onReady={(e) => e.target.playVideo()}
                        />
                    }
                </Modal>
            </Wrapper>
        );
    }
}

ProgramsPage.propTypes = {
    menuOpen: PropTypes.bool,
    rubrics: Rubrics.propTypes.rubrics,
    records: Records.propTypes.items,
    setRecordsType: PropTypes.func,
    openPage: PropTypes.func,
    loadRecords: PropTypes.func,
    changeRubric: PropTypes.func,
    deleteRecord: PropTypes.func,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    startEditRecord: PropTypes.func,
    search: PropTypes.func,
    playVideo: PropTypes.func,
    selectedRecord: PropTypes.object,
    ProgramsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    ProgramsPage: makeSelectProgramsPage(),
    menuOpen: selectMenuExpandedStatus,
    rubrics: makeSelectRubricsNames(),
    records: makeGetRecords(),
    selectedRecord: makeGetSelectedRecord(),
});

function mapDispatchToProps(dispatch) {
    return {
        setRecordsType: (type) => dispatch(setRecordsType(type.value)),
        openPage: () => dispatch(openPage()),
        deleteRecord: (id) => dispatch(deleteRecord(id)),
        loadRubrics: () => dispatch(loadRubrics()),
        changeRubric: (id) => dispatch(changeRubric(id[0])),
        loadRecords: (replace) => dispatch(loadRecords(replace)),
        openModal: (modal) => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal()),
        startEditRecord: (id) => dispatch(startEditRecord(id)),
        search: (query) => dispatch(searchRecord(query)),
        playVideo: (id) => dispatch(playVideo(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsPage);
