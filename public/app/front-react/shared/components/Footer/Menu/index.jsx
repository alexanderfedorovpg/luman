import React from 'react'
import classNames from 'classnames'

import './style.scss'

function Menu({ className }) {

    return (
        <div className={classNames('col-menu', className)}>
            <nav className="col-menu__nav">
                <ul className="col-menu__ul">
                    {menuData.map(({ title, link }, i) => (
                        <li className="col-menu__li" key={i}>
                            <a className="col-menu__link" href={link}>
                                {title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Menu

const menuData = [
    {
        title: 'Телепрограмма',
        link: 'javascript:void(0)'
    },
    {
        title: 'Лицензии',
        link: 'javascript:void(0)'
    },
    {
        title: 'Как смотреть',
        link: 'javascript:void(0)'
    },
    {
        title: 'Карьера',
        link: 'javascript:void(0)'
    },
    {
        title: 'Размещение рекламы',
        link: 'javascript:void(0)'
    },
    {
        title: 'Правила пользования',
        link: 'javascript:void(0)'
    },
    {
        title: 'Контакты',
        link: 'javascript:void(0)'
    }
]
