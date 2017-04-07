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

import {
    selectEditors
} from 'containers/App/selectors';

import {
    loadFeed,
    hideFeedItem,
    selectFeed,
    setFilters,
    feedToWork
} from './actions'

import { loadEditors } from 'containers/App/actions'

import Header from 'components/Feed/Header'
import Form from 'components/Feed/Form'
import { Wrap, Left, Right } from 'components/Content'
import News from 'components/News'

export class FeedPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);

        this.hideItem = this.hideItem.bind(this)
        this.work = this.work.bind(this)
        this.applyFilters = this.applyFilters.bind(this)
        this.sendToWork = this.sendToWork.bind(this)
    }

    componentDidMount() {
        this.loadFeed()
        this.props.dispatch(loadEditors())
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

    work(id) {
        this.props.dispatch(selectFeed(id))
    }

    sendToWork(data) {
        this.props.dispatch(feedToWork(data))
    }

    applyFilters(filters) {
        let searchString = filters.keywords
        let ia = filters.agency

        this.props.dispatch(setFilters({ searchString, ia }))

        this.loadFeed()
    }

    loadFeed(params) {
        this.props.dispatch(loadFeed(params))
    }

    render() {
        let {
            news,
            menuOpen,
            selectedFeed,
            pagination,
            router,
            loading,
            search,
            editors
        } = this.props

        return (
            <div>
                <Helmet
                    title="Лента" />

                <Header moved={menuOpen} onSearchChange={this.applyFilters} />
                <Wrap>
                    <Left>
                        <News
                            data={news}
                            hide={this.hideItem}
                            toWork={this.work}
                            pagination={pagination}
                            loading={loading} />
                    </Left>
                    <Right>
                        <Form
                            data={selectedFeed}
                            users={editors}
                            onSubmit={this.sendToWork} />
                    </Right>
                </Wrap>
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
    search: selectSearchVars(state).toJS(),
    selectedFeed: selectedFeed(state),
    pagination: selectedPagination(state),
    loading: selectedLoading(state),
    editors: selectEditors(state)
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
