import React from 'react'
import classNames from 'classnames'

import MiniNews from 'components/MiniNews'

import './style.scss'

function Now({ data, className }) {

    return (
        <div className={classNames('now', className)}>
            <p className="now__title section-title">
                Сейчас
            </p>
            <div className="now__news">
                {data.map(value => (
                    <MiniNews data={value} key={value.Id} className="now__mini-news" />
                ))}
            </div>
        </div>
    )
}

export default Now