import React from 'react'
import classNames from 'classnames'

import Block from 'components/Block'
import MiniNews from 'components/MiniNews'

import './style.scss'

function News({ data, className }) {
    const first = data[0]
    const rest = data.slice(1, 5)

    if (!first) return null

    return (
        <div className={classNames('news', className)}>
            <p className="news__title section-title">
                Новости
            </p>
            <div className="news__list">
                <Block data={first} className="news__block-square" />
                <div className="new__list-mini">
                    {rest.map(v => (
                        <MiniNews key={v.id} data={v} className="news__mini-news" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default News
