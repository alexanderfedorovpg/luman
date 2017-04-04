/*
 *
 * FeedPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { selectFeedList, selectedFeed } from './selectors';

import { loadFeed, hideFeedItem, selectFeed } from './actions'

import Feed from '../../components/Feed'

export class FeedPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);

        this.hideItem = this.hideItem.bind(this)
        this.toWork = this.toWork.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(loadFeed())
    }

    hideItem(id) {
        this.props.dispatch(hideFeedItem(id))
    }

    toWork(id) {
        this.props.dispatch(selectFeed(id))
    }

    render() {
        let { news, menuOpen, users, selectedFeed } = this.props

        return (
            <div>
                <Helmet
                    title="Лента"
                    meta={[
                        { name: 'description', content: 'Description of FeedPage' },
                    ]} />
                    <Feed
                        news={news}
                        moved={menuOpen}
                        users={users}
                        toWork={this.toWork}
                        hideItem={this.hideItem}
                        worked={selectedFeed ? selectedFeed.toJS() : {}} />
            </div>
        );
    }
}

FeedPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    menuOpen: state.get('app').get('menuOpen'),
    news: selectFeedList(state),
    users: [
            {
                    name: 'Ковалев Максим',
                    pic: '/img/user1.png'
            },
            {
                    name: 'Короленко Анастасия',
                    pic: '/img/user2.png'
            }
    ],
    selectedFeed: selectedFeed(state)
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
