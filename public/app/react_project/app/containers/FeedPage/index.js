/*
 *
 * FeedPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import {
    selectFeedList,
    selectedFeed,
    selectedPagination,
    selectedLoading,
    selectSearchVars
} from './selectors';

import { loadFeed, hideFeedItem, selectFeed, setFilters } from './actions'

import Feed from '../../components/Feed'

export class FeedPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);

        this.hideItem = this.hideItem.bind(this)
        this.toWork = this.toWork.bind(this)
        this.applyFilters = this.applyFilters.bind(this)
    }

    componentDidMount() {
        this.loadFeed()
    }

    componentWillReceiveProps(nextProps) {
        let page = this.props.location.query.page || 1
        let nextPage = nextProps.location.query.page || 1

        if (+page !== +nextPage) {
            this.loadFeed({ page: nextPage })
        }
    }

    hideItem(id) {
        this.props.dispatch(hideFeedItem(id))
    }

    toWork(id) {
        this.props.dispatch(selectFeed(id))
    }

    applyFilters(filters) {
        this.props.dispatch(setFilters(filters))

        this.loadFeed(filters)
    }

    loadFeed(params) {
        let { search } = this.props;
        let page = this.props.location.query.page || 1

        this.props.dispatch(loadFeed({ page, ...search, ...params }))
    }

    render() {
        let {
            news,
            menuOpen,
            users,
            selectedFeed,
            pagination,
            router,
            loading,
            search
        } = this.props

        return (
            <div>
                <Helmet
                    title="Лента" />
                <Feed
                    news={news}
                    pagination={pagination}
                    loading={loading}
                    moved={menuOpen}
                    users={users}
                    toWork={this.toWork}
                    hideItem={this.hideItem}
                    onSearchChange={this.applyFilters}
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
    search: selectSearchVars(state).toJS(),
    selectedFeed: selectedFeed(state),
    pagination: selectedPagination(state),
    loading: selectedLoading(state)
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
