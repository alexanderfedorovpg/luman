/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Root from '../../components/Root'
import Header from '../../components/Header'
import NavSide from '../../components/NavSide'
import Content from '../../components/Content'

import LoginPage from '../LoginPage'

import { logout } from '../LoginPage/actions'

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    static propTypes = {
        children: React.PropTypes.node,
    };

    render() {
        let { menuOpen, toggleMenu, closeMenu, router, token } = this.props

        return token
            ? <Root onClick={closeMenu}>
                <Header
                    moved={menuOpen}
                    onToggle={toggleMenu}
                    isActive={router.isActive}
                    onLogout={this.props.logout} />
                <NavSide
                    expanded={menuOpen}
                    isActive={router.isActive} />
                <Content moved={menuOpen}>
                    {React.Children.toArray(this.props.children)}
                </Content>
            </Root>

            : <LoginPage />
    }
}

const mapStateToProps = state => ({
    menuOpen: state.get('app').get('menuOpen'),
    token: state.get('app').get('api-token'),
})

const mapDispatchToProps = dispatch => ({
    toggleMenu() {
        dispatch({
            type: 'TOGGLE_MENU'
        })
    },

    closeMenu() {
        dispatch({
            type: 'CLOSE_MENU'
        })
    },

    logout() {
        dispatch(logout())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
