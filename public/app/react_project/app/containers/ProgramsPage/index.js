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

        this.onWaypointChange = this.onWaypointChange.bind(this);
    }

    componentDidMount() {
        this.props.openPage();
    }

    onWaypointChange(waypoint) {
        const { allRecordsUploaded } = this.props.ProgramsPage;

        if (allRecordsUploaded) {
            return;
        }

        if (waypoint.currentPosition !== 'below') {
            return;
        }

        this.props.loadRecords(false);
    }

    render() {
        const { menuOpen, rubrics, records } = this.props;
        const { recordsType, rubric } = this.props.ProgramsPage;

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
                        <Waypoint onPositionChange={this.onWaypointChange}>
                            <div>
                                <Records
                                    onRecordDelete={this.props.deleteRecord}
                                    items={records}
                                />
                            </div>
                        </Waypoint>
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
        loadRecords: () => dispatch(loadRecords()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsPage);
