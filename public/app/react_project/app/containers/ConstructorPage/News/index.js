import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
    loadNewslist
} from './../actions'

import {
    selectNewsList
} from './../selectors';

import {
    selectEditors
} from 'containers/App/selectors';


export class News extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadNewslist()
    }

    render() {
        let {
            news,
        } = this.props;

        return (
            <div>
                News
            </div>
        )
    }

}

News.propTypes = {
};

const mapStateToProps = state => ({
    news: selectNewsList(state)
})

const mapDispatchToProps = dispatch => ({
    loadNewslist() {
        dispatch(loadNewslist())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(News);
