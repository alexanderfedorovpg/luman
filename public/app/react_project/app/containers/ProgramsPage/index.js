/*
 *
 * ProgramsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { selectMenuExpandedStatus } from 'containers/App/selectors';
import { loadRubrics } from 'containers/App/actions';
import Records from 'components/Records';
import ContentModal from 'components/Modal/ContentModal';
import Waypoint from 'react-waypoint';

import makeSelectProgramsPage, {
    makeSelectRubricsNames,
    makeGetRecords,
} from './selectors';
import {
    openPage,
    setRecordsType,
    deleteRecord,
    changeRubric,
    loadRecords,
} from './actions';
import Header from './Header';
import { Wrapper, Content } from './style';
import Rubrics from './Rubrics';
import RecordForm from './RecordForm';

export class ProgramsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static modals = {
        record: 'record',
    }

    constructor(props) {
        super(props);

        this.loadMoreRecords = this.loadMoreRecords.bind(this);
        this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            openedModal: null,
        };
    }

    componentDidMount() {
        this.props.openPage();
    }

    loadMoreRecords() {
        this.props.loadRecords(false);
    }

    openModal(name) {
        this.setState({
            openedModal: name,
        });
    }

    closeModal() {
        this.setState({
            openedModal: null,
        });
    }

    render() {
        const { menuOpen, rubrics, records } = this.props;
        const { recordsType, rubric, loading, allRecordsUploaded } = this.props.ProgramsPage;

        return (
            <Wrapper>
                <Helmet title="Список программ" />
                <Header
                    moved={menuOpen}
                    type={recordsType}
                    onUpload={() => this.openModal(ProgramsPage.modals.record)}
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
                            onRecordDelete={this.props.deleteRecord}
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
                    onRequestClose={this.closeModal}
                    isOpen={this.state.openedModal === ProgramsPage.modals.record}
                >
                    <RecordForm
                        onCancel={this.closeModal}
                    />
                </ContentModal>
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
    ProgramsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    ProgramsPage: makeSelectProgramsPage(),
    menuOpen: selectMenuExpandedStatus,
    rubrics: makeSelectRubricsNames(),
    records: makeGetRecords(),
});

function mapDispatchToProps(dispatch) {
    return {
        setRecordsType: (type) => dispatch(setRecordsType(type.value)),
        openPage: () => dispatch(openPage()),
        deleteRecord: (id) => dispatch(deleteRecord(id)),
        loadRubrics: () => dispatch(loadRubrics()),
        changeRubric: (id) => dispatch(changeRubric(id[0])),
        loadRecords: (replace) => dispatch(loadRecords(replace)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsPage);
