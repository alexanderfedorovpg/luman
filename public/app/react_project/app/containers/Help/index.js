import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Help from 'components/Help'

import {
    getLinks
} from './actions'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    getLinks(query) {
        dispatch(getLinks(query))
    },
    getPage() {
        // dispatch(action())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Help)
