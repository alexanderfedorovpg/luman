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
import { connect } from 'react-redux';

import Root from 'components/Root';
import Header from 'components/Header';
import NavSide from 'components/NavSide';
import Content from 'components/Content';
import withProgressBar from 'components/ProgressBar';

import LoginPage from 'containers/LoginPage';

import { logout } from 'containers/LoginPage/actions';
import {
    closeMenu,
    toggleMenu,
    loadRubrics,
    loadUsers,
    loadCurrentUser,
    loadGroups,
} from './actions';

import { selectCurrentUser, getLive } from './selectors';
// import { makeGetLiveState } from 'containers/LivePage/selectors';
import Preloader from './Preloader';
import InfoModal from './InfoModal';

import * as api from 'api';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    static propTypes = {
        children: React.PropTypes.node,
        live: React.PropTypes.bool,
    };

    componentWillMount() {
        if (this.props.token) {
            this.loadData(this.props.token);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token && (this.props.token !== nextProps.token)) {
            this.loadData(nextProps.token);
        }
    }

    loadData(token) {
        api.setToken(token);

        setTimeout(() => {
            this.props.loadRubrics();
            this.props.loadUsers();
            this.props.loadCurrentUser();
            this.props.loadGroups();
        });
    }

    render() {
        let { menuOpen, toggleMenu, closeMenu, router, token, currentUser, live } = this.props;

        return token && currentUser
            ? <Root onClick={closeMenu}>
                <Header
                    moved={menuOpen}
                    user={currentUser}
                    onToggle={toggleMenu}
                    isActive={router.isActive}
                    onLogout={this.props.logout}
                />
                <NavSide
                    expanded={menuOpen}
                    location={router.location}
                    isActive={router.isActive}
                    live={live}
                />
                <Content moved={menuOpen}>
                    {React.Children.toArray(this.props.children)}
                </Content>
                <InfoModal />
                <Preloader />
            </Root>

            : <LoginPage />;
    }
}

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
    menuOpen: state.get('app').get('menuOpen'),
    token: state.get('app').get('api-token'),
    live: state.get('livePage') ? state.get('livePage').get('live') : false,
});

const mapDispatchToProps = (dispatch) => ({
    toggleMenu() {
        dispatch(toggleMenu());
    },

    closeMenu() {
        dispatch(closeMenu());
    },

    logout() {
        dispatch(logout());
    },

    loadRubrics() {
        dispatch(loadRubrics());
    },

    loadUsers() {
        dispatch(loadUsers());
    },

    loadCurrentUser() {
        dispatch(loadCurrentUser());
    },

    loadGroups() {
        dispatch(loadGroups());
    },
});

export default withProgressBar(connect(mapStateToProps, mapDispatchToProps)(App));
