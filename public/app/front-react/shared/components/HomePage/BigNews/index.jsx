import React from 'react'
import classNames from 'classnames'

import './style.scss'
import logo from './blue-rtvi.png'

function BigNews({ className }) {

    return (
        <div className={classNames('big-news', className)}>
            <a className="big-news__link" href="javascript:void(0)"></a>
            <img className="big-news__img" src="/content/big-news/trump.jpg" alt="" role="presentation" />
            <div className="big-news__info">
                <p className="big-news__title">Трамп обвинил Асада в атаке с использованием зарина
                </p>
                <p className="big-news__time-add">40 минут назад /
                </p>
                <p className="big-news__time-update">Обновлено 10 минут назад
                </p>
                <p className="big-news__description big-news__position big-news__position_margin">Дональд трамп считает президента Сирии Башара Асада виноватым в атаке с использованием химического
                    оружия
                </p>
                <div className="big-news__logo">
                    <span className="big-news__logo-title">News</span>
                    <img className="big-news__logo" src={logo} alt="" role="presentation" />
                </div>
            </div>
        </div>
    )
}

export default BigNews
