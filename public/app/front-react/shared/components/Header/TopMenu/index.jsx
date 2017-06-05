import React from 'react'
import { NavLink } from 'react-router-dom'

import './style.scss'

function TopMenu() {

    return (
        <div className="top-menu header__top-menu">
            <nav className="top-menu__nav">
                <ul className="top-menu__ul">
                    <li className="top-menu__item">
                        <NavLink activeClassName="selected" to="/news" className="top-menu__link">
                            Новости
                        </NavLink>
                    </li>
                    <li className="top-menu__item">
                        <NavLink activeClassName="selected" to="/noise" className="top-menu__link">
                            Инфошум
                        </NavLink>
                    </li>
                    <li className="top-menu__item">
                        <NavLink activeClassName="selected" to="/broadcast" className="top-menu__link">
                            Из эфира
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default TopMenu
