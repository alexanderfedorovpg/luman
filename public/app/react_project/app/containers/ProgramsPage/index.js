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
import makeSelectProgramsPage from './selectors';
import {
    setFilter,
} from './actions';

import Programs from 'components/Programs';
import Header from './Header';
import Wrap from './Wrap';
import TopPanel from './TopPanel';

export class ProgramsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { menuOpen } = this.props;
        const { filter, programs } = this.props.ProgramsPage;
        return (
            <div>
                <Header
                    moved={menuOpen}
                    filter={filter}
                    setFilter={this.props.setFilter}
                />
                <Wrap>
                    <TopPanel />
                    <Programs items={programs} />
                </Wrap>
            </div>
        );
    }
}

ProgramsPage.propTypes = {
    menuOpen: PropTypes.bool,
    setFilter: PropTypes.func.isRequired,
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsPage);
