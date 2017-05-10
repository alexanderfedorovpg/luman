import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import MiniNews from 'components/MiniNews'

import './style.scss'

function NowWar({ data, className }) {

    return (
        <div className={classNames('now-war', className)}>
            <Link to={'#'} className="now-war__title">
                Убит лидер Северной Кореи
            </Link>
            <div className="now-war__live now-war__live now-war__live_margin">
                <p className="now-war__live-title">
                    Live: Главное
                </p>
            </div>
            <div className="now-war__translate now-war__translate now-war__translate_margin">
                {data.map(value => (
                    <MiniNews data={value} key={value.id} className="now-war__mini-news" />
                ))}
            </div>
            <Link to={'#'} className="now-war__translate-link">
                 Следить за онлайн-трансляцией
            </Link>
        </div>
    )
}

export default NowWar
