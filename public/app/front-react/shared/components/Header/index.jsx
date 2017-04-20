import React from 'react'

import Burger from 'components/Burger'
import Logo from './Logo'
import TopMenu from './TopMenu'
import RSS from 'components/RSS'
import Search from 'components/Search'

import './style.scss'

function Header() {

    return (
        <header className="header position">
            <div className="header__container container">
                <div className="header__left-part">
                    <div className="header__part-wrapper">
                        <Burger />
                        <Logo />
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
