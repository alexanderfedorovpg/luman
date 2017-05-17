/*
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Wrap } from 'components/Content';

import Header from './Header';

export class ProfilePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <Helmet>
                    <title>Профиль пользователя</title>
                </Helmet>
                <Header />
                <Wrap>
                    {this.props.children}
                </Wrap>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    children: PropTypes.node,
};

export default ProfilePage;
