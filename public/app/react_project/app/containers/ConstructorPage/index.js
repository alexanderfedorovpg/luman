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
    setFilter,
    loadNewslist
} from './actions'

import { filters } from './constants';

import {
    selectedPagination,
    selectedLoading,
    selectSearchVars,
    selectedFilter,
    selectNewsList
} from './selectors';

import {
    selectEditors
} from 'containers/App/selectors';


import Header from 'components/Constructor/Header';
import News from 'components/Constructor/News';
import Tabs from 'components/Constructor/News/Tabs';
import Collapse from 'components/Constructor/Collapse';


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

const RightTabs = styled(Tabs)`
    margin-left: 0.5625rem;
    padding: 0px;
    border-bottom: transparent; 
`

const CustomRight = styled(Right)`
    width: 41.584%;
    -ms-flex-preferred-size: 41.584%;
    flex-basis: 41.584%;
    margin-top: -11px;
    padding-left: 1.5rem;   
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    padding-left: 1.1875rem;
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
        this.props.loadNewslist()
    }

    componentWillReceiveProps(nextProps) {
        let page = this.props.location.query.page || 1
        let nextPage = nextProps.location.query.page || 1

        if (+page !== +nextPage) {
            this.loadNewslist({ page: nextPage })
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
                        />
                    </CustomLeft>
                    <CustomRight>
                        {/*<RightTabs data={filters} active={active} onClick={this.props.setFilter} />*/}
                        <Collapse tabs={filters} />
                    </CustomRight>
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
    news: selectNewsList(state),
    search: selectSearchVars(state).toJS(),
    pagination: selectedPagination(state),
    loading: selectedLoading(state),
    editors: selectEditors(state),
    filter: selectedFilter(state)
})

function mapDispatchToProps(dispatch) {
    return {
        loadNewslist() {
            dispatch(loadNewslist())
        },
        setFilter(filter) {
            dispatch(setFilter(filter));
        },
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorPage);