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

import makeSelectProgramsPage, {
    makeSelectRubricsNames,
    makeGetRecords,
} from './selectors';
import {
    openPage,
    setRecordsType,
    deleteProgram,
    changeRubric,
    loadRecords,
} from './actions';
import Header from './Header';
import Wrapper from './Wrapper';
import Content from './Content';
import Rubrics from './Rubrics';

export class ProgramsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.openPage();
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
                    setRecor={this.props.setRecordsType}
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
                            onProgramDelete={this.props.deleteProgram}
                            items={records}
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
    deleteProgram: PropTypes.func,
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
        setRecordsType: (filter) => dispatch(setRecordsType(filter.value)),
        openPage: () => dispatch(openPage()),
        deleteProgram: (id) => dispatch(deleteProgram(id)),
        loadRubrics: () => dispatch(loadRubrics()),
        changeRubric: (id) => dispatch(changeRubric(id[0])),
        loadRecords: () => dispatch(loadRecords()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsPage);
