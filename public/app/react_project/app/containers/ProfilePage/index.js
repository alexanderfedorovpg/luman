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

import { lastActionsMap, LAST_ACTIONS_UPLOAD_NUM } from './constants';
import makeSelectProfilePage, {
    makeProfileStats,
    makeLastActions,
} from './selectors';
import { sortHistory, getLastActions } from './actions';
import Header from './Header';
import AccountForm from './AccountForm';
import Stats from './Stats';
import { Profile, History, HistoryTable, MoreLink } from './style';

const historyHeader = lastActionsMap.map((item) => item.label);

export class ProfilePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.onMoreLinkClick = this.onMoreLinkClick.bind(this);
    }

    onMoreLinkClick(e) {
        e.preventDefault();
        this.props.getLastActions();
    }

    renderTabContent() {
        const { activeTab, allActionsLoaded } = this.props.ProfilePage;
        const { lastActions } = this.props;

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
                        <HistoryTable
                            onSort={this.props.sortHistory}
                            header={historyHeader}
                            body={lastActions}
                            sortable
                        />
                        {
                            !allActionsLoaded &&
                            (
                                <MoreLink href="#" onClick={this.onMoreLinkClick}>
                                    Показать еще {LAST_ACTIONS_UPLOAD_NUM} записей
                                </MoreLink>
                            )
                        }
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
    lastActions: PropTypes.array,
    sortHistory: PropTypes.func,
    getLastActions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    ProfilePage: makeSelectProfilePage(),
    stats: makeProfileStats(),
    lastActions: makeLastActions(),
});

export default connect(mapStateToProps, { sortHistory, getLastActions })(ProfilePage);
