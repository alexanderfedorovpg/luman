import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components'
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

const CollapseWrapp = styled.div`
    position: fixed;
    top: 121px;
    bottom: 0px;
    overflow-y: auto;
`

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
        const {
            news,
            categories,
            removeFromMain,
            toMain,
            location
        } = this.props
        const type = location.pathname.split('/').pop()
        const filteredCategories = categories.filter(v => (
            type == 'news'
                ? v.mode == null
                : v.mode == type
        ))

        return (
            <Wrap>
                <Left>
                    <Tabs />
                    <NewsComponent data={news} toMain={toMain.bind(this, type)} />
                </Left>
                <Right>
                    <Collapse
                        type={type}
                        showTitle={type=='war'}
                        onRemove={removeFromMain.bind(this, type)}
                        categories={filteredCategories} />
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
    toMain(type, item, category, before) {
        dispatch(itemToMain(item, type, category, before))
    },
    removeFromMain(type, item) {
        dispatch(removeFromMain(item, type))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(News);
