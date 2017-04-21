/*
 *
 * ProgramsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    selectMenuExpandedStatus,
} from 'containers/App/selectors';
import Programs from 'components/Programs';

import makeSelectProgramsPage from './selectors';
import {
    setFilter,
    loadPrograms,
} from './actions';
import Header from './Header';
import Wrapper from './Wrapper';
import Content from './Content';
import TopPanel from './TopPanel';

export class ProgramsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.loadPrograms();
    }

    render() {
        const { menuOpen } = this.props;
        const { filter, programs } = this.props.ProgramsPage;
        return (
            <Wrapper>
                <Header
                    moved={menuOpen}
                    filter={filter}
                    setFilter={this.props.setFilter}
                />
                <Content>
                    <TopPanel />
                    <Programs items={programs} />
                </Content>
            </Wrapper>
        );
    }
}

ProgramsPage.propTypes = {
    menuOpen: PropTypes.bool,
    setFilter: PropTypes.func,
    loadPrograms: PropTypes.func,
    ProgramsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    ProgramsPage: makeSelectProgramsPage(),
    menuOpen: selectMenuExpandedStatus,
});

function mapDispatchToProps(dispatch) {
    return {
        setFilter(filter) {
            dispatch(setFilter(filter.value));
        },
        loadPrograms() {
            dispatch(loadPrograms());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsPage);
