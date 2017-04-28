/*
 *
 * LivePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Wrap } from 'components/Content';
import { LiveList } from 'components/Live';

import makeSelectLivePage from './selectors';
import Header from './Header';
import Details from './Details';

export class LivePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { items } = this.props.LivePage;
        return (
            <div>
                <Helmet title="Прямой эфир" />
                <Header />
                <Wrap>
                    <LiveList items={items} />
                    <Details />
                </Wrap>
            </div>
        );
    }
}

LivePage.propTypes = {
    LivePage: PropTypes.object,
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
