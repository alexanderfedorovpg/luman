import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Wrap, Left, Right } from 'components/Constructor/Content'
import NewsComponent from 'components/Constructor/News'
import Tabs from 'components/Constructor/Tabs'
import Collapse from '../Collapse'

import {
    loadNews,
    itemToMain,
    removeFromMain,
} from '../actions'

import {
    selectNews,
    selectCategories,
} from '../selectors';

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
            categories,
            removeFromMain,
            toMain,
        } = this.props

        return (
            <Wrap>
                <Left>
                    <Tabs />
                    <NewsComponent data={news} toMain={toMain} />
                </Left>
                <Right>
                    <Collapse
                        type={'news'}
                        onRemove={removeFromMain}
                        categories={categories} />
                </Right>
            </Wrap>
        )
    }

}

News.propTypes = {
};

const mapStateToProps = state => ({
    news: selectNews(state),
    filters: selectFilters(state),
    categories: selectCategories(state),
})

const mapDispatchToProps = dispatch => ({
    loadNewslist() {
        dispatch(loadNews())
    },
    toMain(item, category, before) {
        dispatch(itemToMain(item, 'news', category, before))
    },
    removeFromMain(item) {
        dispatch(removeFromMain(item, 'news'))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(News);
