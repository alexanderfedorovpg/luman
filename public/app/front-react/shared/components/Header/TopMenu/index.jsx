import React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

function TopMenu() {

    return (
        <div className="top-menu header__top-menu">
            <nav className="top-menu__nav">
                <ul className="top-menu__ul">
                    <li className="top-menu__item">
                        <Link to="/" className="top-menu__link">
                            Главное
                        </Link>
                    </li>
                    <li className="top-menu__item">
                        <Link to="/news" className="top-menu__link">
                            Новости
                        </Link>
                    </li>
                    <li className="top-menu__item">
                        <Link to="/noise" className="top-menu__link">
                            Инфошум
                        </Link>
                    </li>
                    {/*<li className="top-menu__item">
                        <Link to="/broadcast" className="top-menu__link">
                            Из эфира
                        </Link>
                    </li>*/}
                </ul>
            </nav>
        </div>
    )
}

export default TopMenu
