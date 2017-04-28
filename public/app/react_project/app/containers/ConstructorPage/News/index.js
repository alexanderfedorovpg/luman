import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import NewsComponent from 'components/Constructor/News'

import {
    loadNews,
    itemToMain
} from './../actions'

import {
    selectNews
} from './../selectors';

import {
    selectFilters
} from '../selectors'

export class News extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadNewslist()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filters.search !== nextProps.filters.search) {
            this.props.loadNewslist()
        }
    }

    render() {
        let {
            news,
            toMain
        } = this.props;

        return (
            <NewsComponent data={news} toMain={toMain} />
        )
    }

}

News.propTypes = {
};

const mapStateToProps = state => ({
    news: selectNews(state),
    filters: selectFilters(state)
})

const mapDispatchToProps = dispatch => ({
    loadNewslist() {
        dispatch(loadNews())
    },
    toMain(item, category) {
        dispatch(itemToMain(item, 'news', category))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(News);
