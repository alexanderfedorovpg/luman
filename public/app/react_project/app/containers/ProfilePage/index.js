/*
 *
 * ProfilePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Wrap } from 'components/Content';

import makeSelectProfilePage from './selectors';
import Header from './Header';
import AccountForm from './AccountForm';

export class ProfilePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <Helmet>
                    <title>Профиль пользователя</title>
                </Helmet>
                <Header />
                <Wrap>
                    <AccountForm />
                </Wrap>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    ProfilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
