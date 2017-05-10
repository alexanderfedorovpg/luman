import React from 'react'
import classNames from 'classnames'

import Burger from 'components/Burger'
import Logo from './Logo'
import TopMenu from './TopMenu'
import Alarm from './Alarm'
import RSS from 'components/RSS'
import Search from 'components/Search'

import './style.scss'

function Header({ war }) {

    return (
        <header className={classNames('header', { header_war: war })}>
            {war
                ? <Alarm />
                : null
            }
            <div className="header__container container">
                <div className="header__left-part">
                    <div className="header__part-wrapper">
                        <Logo war={war} />
                        <TopMenu />
                    </div>
                </div>
                <div className="header__right-part">
                    <RSS />
                    <Search />
                </div>
            </div>
        </header>
    )
}

export default Header
