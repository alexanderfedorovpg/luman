/*
 *
 * LivePage
 *
 */

import React, {
    PropTypes
} from 'react';
import {
    connect
} from 'react-redux';
import Helmet from 'react-helmet';
import {
    createStructuredSelector
} from 'reselect';
import makeSelectLivePage from './selectors';

export class LivePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <Helmet title = "LivePage" />
            </div>
        );
    }
}

LivePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    LivePage: makeSelectLivePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LivePage);
