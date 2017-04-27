import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import News from 'components/Constructor/News'

import {
    loadNews,
    itemToMain
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
            toMain
        } = this.props

        return (
            <News data={news} toMain={toMain} />
        )
    }

}

Noise.propTypes = {
};

const mapStateToProps = state => ({
    news: selectNoise(state),
    filters: selectFilters(state)
})

const mapDispatchToProps = dispatch => ({
    loadNewslist() {
        dispatch(loadNews())
    },
    toMain(item, category) {
        dispatch(itemToMain(item, 'noise', category))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Noise);Noise
