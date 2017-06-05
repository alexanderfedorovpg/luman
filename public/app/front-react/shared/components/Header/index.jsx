import React from 'react';
import classNames from 'classnames';

import { withRouter } from 'react-router-dom';
import Burger from 'components/Burger';
import RSS from 'components/RSS';
import Search from 'components/Search';
import InfoIcon from 'components/Icon/Info';

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
                        <Burger />
                        <Logo war={war} />
                        <InfoIcon width="18px" height="18px" />
                        <TopMenu />
                        <Rates />
                    </div>
                </div>
                <div className="header__right-part">
                    <RSS />
                    <InfoIcon width="18px" height="18px" />
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
