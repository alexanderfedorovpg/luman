import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';


import { Wrap, Left, Right } from 'components/Constructor/Content'
import News from 'components/Constructor/News'
import Tabs from 'components/Constructor/Tabs'
import Collapse from '../Collapse'

import {
    loadNews,
    itemToMain,
    removeFromMain,
} from './../actions'

import {
    selectNoise
} from './../selectors';

import {
    selectFilters
} from '../selectors'

export class Noise extends PureComponent {

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
            toMain,
            removeFromMain
        } = this.props

        const categories = [{
            id: 1,
            name: 'Инфошум'
        }]

        return (
            <Wrap>
                <Left>
                    <Tabs />
                    <News data={news} toMain={toMain} />
                </Left>
                <Right>
                    <Collapse
                        type={'noise'}
                        onRemove={removeFromMain}
                        categories={categories} />
                </Right>
            </Wrap>
        )
    }

}

Noise.propTypes = {
};

const mapStateToProps = state => ({
    news: selectNoise(state),
    filters: selectFilters(state),
})

const mapDispatchToProps = dispatch => ({
    loadNewslist() {
        dispatch(loadNews())
    },
    toMain(item, category, before) {
        dispatch(itemToMain(item, 'noise', category, before))
    },
    removeFromMain(item) {
        dispatch(removeFromMain(item, 'noise'))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Noise);Noise
