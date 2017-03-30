/*
 *
 * FeedPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectFeedPage from './selectors';

export class FeedPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="FeedPage"
          meta={[
            { name: 'description', content: 'Description of FeedPage' },
          ]}
        />
      </div>
    );
  }
}

FeedPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  FeedPage: makeSelectFeedPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
