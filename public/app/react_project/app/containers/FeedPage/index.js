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

import Feed from '../../components/Feed'

export class FeedPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let { news, menuOpen, users } = this.props

    return (
      <div>
        <Helmet
          title="Лента"
          meta={[
            { name: 'description', content: 'Description of FeedPage' },
          ]} />
          <Feed news={news} moved={menuOpen} users={users} />
      </div>
    );
  }
}

FeedPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menuOpen: state.get('app').get('menuOpen'),
  news: state.get('news').get('data'),
  users: [
      {
          name: 'Ковалев Максим',
          pic: '/img/user1.png'
      },
      {
          name: 'Короленко Анастасия',
          pic: '/img/user2.png'
      }
  ]
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
