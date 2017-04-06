import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Login from '../../components/Login'
import { login } from './actions'

class LoginPage extends Component {

    render() {
        let { login } = this.props

        return (
            <Login onLogin={login} />
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    login(...args) {
        dispatch(login(...args))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
