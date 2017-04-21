import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { Wrap, Left, Right } from 'components/Content'


import {
    loadFeed,
    hideFeedItem,
    selectFeed,
    setFilters,
    feedToWork,
    setFilter
} from './actions'

import { filters } from './constants';

import {
    selectFeedList,
    selectedFeed,
    selectedPagination,
    selectedLoading,
    selectSearchVars,
    selectedFilter
} from './selectors';

import {
    selectEditors
} from 'containers/App/selectors';


import Header from 'components/Constructor/Header';
import News from 'components/Constructor/News';
import Tabs from 'components/Constructor/News/Tabs';


const CustomLeft = styled(Left) `
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: 41.8%;
    flex-basis: 41.8%;
    width: 41.8%;
`

export class ConstructorPage extends React.Component {

    constructor(props) {
        super(props);
        this.applySearch = this.applySearch.bind(this);
        this.hideItem = this.hideItem.bind(this);
        this.work = this.work.bind(this);
        this.sendToWork = this.sendToWork.bind(this)
        this.setFilter = this.setFilter.bind(this);
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

    loadFeed(params) {
        this.props.dispatch(loadFeed(params))
    }

    applySearch(filters) {
        return;
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

    setFilter(filter) {
        console.log(filter);
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
            editors,
            filter
        } = this.props;
        const active = (filters.find((item) => item.value === filter.value) || {}).title;
        return (
            <div>
                <Helmet title="Конструтор" />
                <Header onSearchChange={this.applySearch} />
                <Wrap>
                    <CustomLeft>
                        <Tabs data={filters} active={active} onClick={this.props.setFilter} />
                        <News
                            data={news}
                            loading={loading}
                        />
                    </CustomLeft>
                    <Right>

                    </Right>
                </Wrap>
            </div>
        )
    }

}

ConstructorPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    setFilter: PropTypes.func,
};

const mapStateToProps = state => ({
    menuOpen: state.get('app').get('menuOpen'),
    news: selectFeedList(state),
    search: selectSearchVars(state).toJS(),
    selectedFeed: selectedFeed(state),
    pagination: selectedPagination(state),
    loading: selectedLoading(state),
    editors: selectEditors(state),
    filter: selectedFilter(state)
})

function mapDispatchToProps(dispatch) {
    return {
        setFilter(filter) {
            dispatch(setFilter(filter));
        },
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorPage);