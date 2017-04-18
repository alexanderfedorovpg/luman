/*
 *
 * ProgramsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectProgramsPage from './selectors';

import Header from './Header';

export class ProgramsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <Header></Header>
            </div>
        );
    }
}

ProgramsPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    ProgramsPage: makeSelectProgramsPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsPage);
