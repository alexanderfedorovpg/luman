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

export class ProgramsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.uploadRecords = this.uploadRecords.bind(this);
    }

    componentDidMount() {
        this.props.openPage();
    }

    uploadRecords() {
        this.props.loadRecords(false);
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
                            onEnter={this.uploadRecords}
                        />
                    }
                </Content>
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
