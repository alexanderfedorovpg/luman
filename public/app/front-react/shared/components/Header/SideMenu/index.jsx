import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'


import './style.scss'

import Subscribe from 'components/Footer/Subscribe';

function SideMenu({active, toggle}) {

    return (
        <div className={classNames('side-menu header__side-menu', {'side-menu__active' : active})}>
            <nav className="side-menu__nav">
                <ul className="side-menu__ul">
                    <li className="side-menu__item">
                        <NavLink onClick={toggle} activeClassName="selected" to="/news" className="side-menu__link">
                            Новости
                        </NavLink>
                    </li>
                    <li className="side-menu__item">
                        <NavLink onClick={toggle} activeClassName="selected" to="/noise" className="side-menu__link">
                            Инфошум
                        </NavLink>
                    </li>
                    <li className="side-menu__item">
                        <NavLink onClick={toggle} activeClassName="selected" to="/broadcast" className="side-menu__link">
                            Из эфира
                        </NavLink>
                    </li>
                </ul>
                <Subscribe className="side-menu__subscribe" />
            </nav>
        </div>
    )
}

export default SideMenu
