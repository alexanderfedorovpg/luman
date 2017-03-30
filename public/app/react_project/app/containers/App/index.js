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

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    static propTypes = {
        children: React.PropTypes.node,
    };

    render() {
        let { menuOpen, toggleMenu } = this.props

        return (
            <Root>
                <Header
                    moved={menuOpen}
                    onToggle={toggleMenu} />
                <NavSide expanded={menuOpen} />
                <Content moved={menuOpen}>
                    {React.Children.toArray(this.props.children)}
                </Content>
            </Root>
        );
    }
}

const mapStateToProps = state => ({
    menuOpen: state.get('app').get('menuOpen')
})

const mapDispatchToProps = dispatch => ({
    toggleMenu() {
        dispatch({
            type: 'TOGGLE_MENU'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
