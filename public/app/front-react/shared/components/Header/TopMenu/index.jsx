import React from 'react'

import './style.scss'

function TopMenu() {

    return (
        <div className="top-menu header__top-menu">
            <nav className="top-menu__nav">
                <ul className="top-menu__ul">
                    <li className="top-menu__item">
                        <a className="top-menu__link" href="javascript:void(0)">Главное</a>
                    </li>
                    <li className="top-menu__item">
                        <a className="top-menu__link" href="javascript:void(0)">Новости</a>
                    </li>
                    <li className="top-menu__item">
                        <a className="top-menu__link" href="javascript:void(0)">Инфошум</a>
                    </li>
                    <li className="top-menu__item">
                        <a className="top-menu__link" href="javascript:void(0)">Из эфира</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default TopMenu
