import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import './style.scss'

function Menu({ className }) {

    return (
        <div className={classNames('col-menu', className)}>
            <nav className="col-menu__nav">
                <ul className="col-menu__ul">
                    {menuData.map(({ title, link }, i) => (
                        <li className="col-menu__li" key={i}>
                            <Link className="col-menu__link" to={link}>
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Menu

const menuData = [
    // {
    //     title: 'Телепрограмма',
    //     link: '/#'
    // },
    // {
    //     title: 'Лицензии',
    //     link: '/#'
    // },
    //{
    //    title: 'Как смотреть',
    //    link: '/how'
    //},
    // {
    //     title: 'Карьера',
    //     link: '/#'
    // },
    // {
    //     title: 'Размещение рекламы',
    //     link: '/#'
    // },
    // {
    //     title: 'Правила пользования',
    //     link: '/#'
    // },
    // {
    //     title: 'Контакты',
    //     link: '/#'
    // }
]
