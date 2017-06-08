import React from 'react';
import classNames from 'classnames';

import { withRouter } from 'react-router-dom';
import Burger from 'components/Burger';
import RSS from 'components/RSS';
import Search from 'components/Search';
import InfoIcon from 'components/Icon/Info';
import MediaQuery from 'react-responsive'

import Logo from './Logo';
import TopMenu from './TopMenu';
import Rates from './Rates';
import Alarm from './Alarm';

import './style.scss';

function Header({ war, warTitle, history }) {
    function onSearch(query) {
        const location = {
            pathname: '/search',
            search: `?query=${query}`,
        };

        history.push(location);
    }

    return (
        <header className={classNames('header', { header_war: war })}>
            {war
                ? <Alarm data={warTitle} />
                : null
            }
            <div className="header__container container">
                <div className="header__left-part">
                    <div className="header__part-wrapper">
                        <MediaQuery maxWidth="719px">
                            <Burger />
                        </MediaQuery>
                        <Logo war={war} />
                        <InfoIcon width="18px" height="18px" />
                        <TopMenu />
                        <MediaQuery minWidth="1600px">
                            <Rates />
                        </MediaQuery>
                    </div>
                </div>
                <div className="header__right-part">
                    <RSS />
                    <MediaQuery maxWidth="719px">
                        <InfoIcon width="18px" height="18px" />
                    </MediaQuery>
                    <Search
                        onSearch={onSearch}
                        classNames={{ root: 'header__search' }}
                    />
                </div>
            </div>
        </header>
    )
}

export default withRouter(Header);
