/*
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Wrap } from 'components/Content';

import makeSelectProfilePage, { makeProfileStats } from './selectors';
import Header from './Header';
import AccountForm from './AccountForm';
import Stats from './Stats';
import { Profile, History, HistoryTable, MoreLink } from './style';

export class ProfilePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    renderTabContent() {
        const { activeTab, lastActions } = this.props.ProfilePage;

        switch (activeTab) {
            case 'PROFILE':
                return (
                    <Profile>
                        <AccountForm />
                        <Stats items={this.props.stats} />
                    </Profile>
                );
            case 'LAST_ACTIONS':
                return (
                    <History>
                        <HistoryTable {...lastActions} sortable />
                        <MoreLink href="#">
                            Показать еще 10 записей
                        </MoreLink>
                    </History>
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Профиль пользователя</title>
                </Helmet>
                <Header />
                <Wrap>
                    {this.renderTabContent()}
                </Wrap>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    ProfilePage: PropTypes.object,
    stats: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
    ProfilePage: makeSelectProfilePage(),
    stats: makeProfileStats(),
});

export default connect(mapStateToProps)(ProfilePage);
