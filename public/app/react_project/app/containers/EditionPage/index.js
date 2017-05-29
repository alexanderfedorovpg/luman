/*
 *
 * EditionPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import withPermissions from 'HOC/withPermissions';
import makeSelectEditionPage from './selectors';
import Header from './Header';

export class EditionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { admin, checkPermissions } = this.props;

        return (
            <div>
                <Header
                    admin={admin}
                    checkPermissions={checkPermissions}
                />
                {this.props.children}
            </div>
        );
    }
}

EditionPage.propTypes = {
    children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
    EditionPage: makeSelectEditionPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withPermissions(EditionPage));
